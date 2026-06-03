<template>
  <div class="docs-page">
    <!-- Page Banner -->
    <section class="page-banner">
      <div class="banner-bg"></div>
      <div class="container">
        <h1>公开文件</h1>
        <p class="banner-desc">认证规则、收费标准、申请指南等官方文件</p>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <i class="el-icon-arrow-right"></i>
          <span>公开文件</span>
        </div>
      </div>
    </section>

    <!-- 搜索与筛选 -->
    <section class="docs-filter-section">
      <div class="container">
        <div class="filter-bar">
          <div class="search-box">
            <el-input 
              v-model="searchKeyword" 
              placeholder="请输入文件名称或编号..."
              prefix-icon="el-icon-search"
              clearable
              @keyup.enter.native="handleSearch"
            ></el-input>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </div>
          <div class="filter-options">
            <el-select v-model="fileType" placeholder="文件类型" clearable size="small">
              <el-option label="全部类型" value="" />
              <el-option label="PDF" value="pdf" />
              <el-option label="DOCX" value="docx" />
              <el-option label="XLSX" value="xlsx" />
            </el-select>
            <el-select v-model="sortBy" placeholder="排序方式" size="small">
              <el-option label="最新上传" value="newest" />
              <el-option label="名称A-Z" value="name" />
            </el-select>
          </div>
        </div>
      </div>
    </section>

    <!-- 主体内容 -->
    <section class="docs-content-section">
      <div class="container">
        <div class="docs-layout">
          <!-- 左侧分类导航 -->
          <aside class="category-sidebar">
            <h3 class="sidebar-title">文件分类</h3>
            <el-tree
              :data="categoryTree"
              :props="treeProps"
              default-expand-all
              :expand-on-click-node="false"
              @node-click="handleCategoryClick"
              class="category-tree"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span class="node-label">
                  {{ node.label }}
                  <el-tag v-if="data.count" size="mini" type="info">{{ data.count }}</el-tag>
                </span>
              </span>
            </el-tree>
          </aside>

          <!-- 右侧文件列表 -->
          <main class="file-list-area">
            <div class="list-header">
              <h2 class="list-title">
                {{ currentCategoryName || '全部文件' }}
                <span class="file-count">共 {{ filteredFiles.length }} 个文件</span>
              </h2>
            </div>

            <!-- 文件列表 -->
            <div class="file-grid">
              <div 
                v-for="file in paginatedFiles" 
                :key="file.id"
                class="file-card"
              >
                <div class="file-icon">
                  <i :class="getFileIcon(file.format)"></i>
                </div>
                <div class="file-info">
                  <h3 class="file-name" :title="file.name">{{ file.name }}</h3>
                  <div class="file-meta">
                    <span><i class="el-icon-date"></i> {{ file.updateTime }}</span>
                    <span><i class="el-icon-document"></i> {{ file.format.toUpperCase() }}</span>
                    <span><i class="el-icon-files"></i> {{ formatFileSize(file.size) }}</span>
                  </div>
                  <div class="file-desc">{{ file.desc }}</div>
                  <div class="file-stats">
                    <el-tag v-if="file.isNew" size="mini" type="success" effect="dark">NEW</el-tag>
                    <el-tag v-if="file.isHot" size="mini" type="warning" effect="dark">HOT</el-tag>
                  </div>
                </div>
                <div class="file-actions">
                  <el-button 
                    type="text" 
                    size="small" 
                    @click="previewFile(file)"
                    :disabled="!canPreview(file.format)"
                  >
                    <i class="el-icon-view"></i> 预览
                  </el-button>
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="downloadFile(file)"
                  >
                    <i class="el-icon-download"></i> 下载
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty 
              v-if="filteredFiles.length === 0" 
              description="暂无相关文件"
              :image-size="120"
            ></el-empty>

            <!-- 分页 -->
            <div class="pagination-wrapper" v-if="totalPages > 1">
              <el-pagination
                :current-page="currentPage"
                :page-size="pageSize"
                :total="filteredFiles.length"
                layout="total, prev, pager, next, jumper"
                @current-change="handlePageChange"
              ></el-pagination>
            </div>
          </main>
        </div>
      </div>
    </section>

    <!-- 文件预览模态框 -->
    <el-dialog
      :title="previewFileData.name"
      :visible.sync="previewDialogVisible"
      width="80%"
      :before-close="handlePreviewClose"
    >
      <div class="preview-container">
        <iframe 
          v-if="previewFileData.format === 'pdf'"
          :src="previewFileData.previewUrl"
          class="preview-frame"
          frameborder="0"
        ></iframe>
        <div v-else class="preview-unsupported">
          <i class="el-icon-warning-outline"></i>
          <p>该格式暂不支持在线预览，请直接下载查看</p>
          <el-button type="primary" @click="downloadFile(previewFileData)">
            立即下载
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Docs',
  data() {
    return {
      searchKeyword: '',
      fileType: '',
      sortBy: 'newest',
      currentPage: 1,
      pageSize: 10,
      selectedCategory: '',
      previewDialogVisible: false,
      previewFileData: {},
      treeProps: {
        label: 'label',
        children: 'children'
      },
      categoryTree: [
        {
          label: '体系认证',
          id: 'system',
          count: 12,
          children: [
            { label: 'ISO 9001', id: 'iso9001', count: 5 },
            { label: 'ISO 14001', id: 'iso14001', count: 4 },
            { label: 'ISO 45001', id: 'iso45001', count: 3 }
          ]
        },
        {
          label: '产品认证',
          id: 'product',
          count: 8,
          children: [
            { label: 'CCC认证', id: 'ccc', count: 4 },
            { label: 'CE认证', id: 'ce', count: 4 }
          ]
        },
        {
          label: '申请指南',
          id: 'guide',
          count: 6
        },
        {
          label: '收费标准',
          id: 'fee',
          count: 3
        },
        {
          label: '政策法规',
          id: 'policy',
          count: 15
        }
      ],
      fileList: [
        {
          id: 1,
          name: '管理体系/服务认证申请书',
          format: 'docx',
          size: 245678,
          updateTime: '2025-08-06',
          category: 'guide',
          desc: '用于申请各类管理体系认证的标准化表格',
          previewUrl: '#',
          isNew: true,
          isHot: false
        },
        {
          id: 2,
          name: '认证合同范本（2025版）',
          format: 'pdf',
          size: 189432,
          updateTime: '2025-06-15',
          category: 'guide',
          desc: '认证服务标准合同模板，含双方权利义务条款',
          previewUrl: '/preview/contract.pdf',
          isNew: false,
          isHot: true
        },
        {
          id: 3,
          name: 'ISO 9001:2015认证规则',
          format: 'pdf',
          size: 567890,
          updateTime: '2025-10-24',
          category: 'iso9001',
          desc: '最新版质量管理体系认证实施规则',
          previewUrl: '/preview/iso9001-rule.pdf',
          isNew: true,
          isHot: true
        },
        {
          id: 4,
          name: '认证收费标准明细表',
          format: 'xlsx',
          size: 98765,
          updateTime: '2025-01-10',
          category: 'fee',
          desc: '各类认证服务的详细收费标准及说明',
          previewUrl: '#',
          isNew: false,
          isHot: false
        },
        {
          id: 5,
          name: 'CCC认证产品目录（2025）',
          format: 'pdf',
          size: 1234567,
          updateTime: '2025-03-20',
          category: 'ccc',
          desc: '强制性产品认证目录及适用范围说明',
          previewUrl: '/preview/ccc-catalog.pdf',
          isNew: false,
          isHot: true
        },
        {
          id: 6,
          name: '环境因素识别与评价指南',
          format: 'docx',
          size: 345678,
          updateTime: '2025-05-12',
          category: 'iso14001',
          desc: 'ISO 14001认证中环境因素识别的操作指南',
          previewUrl: '#',
          isNew: false,
          isHot: false
        }
      ]
    }
  },
  computed: {
    currentCategoryName() {
      if (!this.selectedCategory) return ''
      const findCategory = (tree, id) => {
        for (let node of tree) {
          if (node.id === id) return node.label
          if (node.children) {
            const result = findCategory(node.children, id)
            if (result) return result
          }
        }
        return null
      }
      return findCategory(this.categoryTree, this.selectedCategory) || ''
    },
    filteredFiles() {
      let result = [...this.fileList]
      
      // 分类筛选
      if (this.selectedCategory) {
        result = result.filter(f => 
          f.category === this.selectedCategory || 
          f.category.startsWith(this.selectedCategory)
        )
      }
      
      // 关键词搜索
      if (this.searchKeyword) {
        const keyword = this.searchKeyword.toLowerCase()
        result = result.filter(f => 
          f.name.toLowerCase().includes(keyword) ||
          f.desc?.toLowerCase().includes(keyword)
        )
      }
      
      // 文件类型筛选
      if (this.fileType) {
        result = result.filter(f => f.format === this.fileType)
      }
      
      // 排序
      if (this.sortBy === 'newest') {
        result.sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime))
      }  else if (this.sortBy === 'name') {
        result.sort((a, b) => a.name.localeCompare(b.name))
      }
      
      return result
    },
    paginatedFiles() {
      const start = (this.currentPage - 1) * this.pageSize
      return this.filteredFiles.slice(start, start + this.pageSize)
    },
    totalPages() {
      return Math.ceil(this.filteredFiles.length / this.pageSize)
    }
  },
  methods: {
    handleSearch() {
      this.currentPage = 1
    },
    handlePageChange(page) {
      this.currentPage = page
      window.scrollTo({ top: 400, behavior: 'smooth' })
    },
    handleCategoryClick(data) {
      if (data.id) {
        this.selectedCategory = data.id
        this.currentPage = 1
      }
    },
    handlePreviewClose() {
      this.previewDialogVisible = false
      this.previewFileData = {}
    },
    getFileIcon(format) {
      const icons = {
        pdf: 'el-icon-document',
        docx: 'el-icon-document-checked',
        xlsx: 'el-icon-s-data',
        pptx: 'el-icon-s-marketing',
        zip: 'el-icon-folder-opened'
      }
      return icons[format.toLowerCase()] || 'el-icon-document'
    },
    canPreview(format) {
      return ['pdf', 'jpg', 'png', 'gif'].includes(format.toLowerCase())
    },
    formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B'
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
      return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    },
    previewFile(file) {
      if (!this.canPreview(file.format)) {
        this.$message.warning('该格式暂不支持在线预览')
        return
      }
      this.previewFileData = file
      this.previewDialogVisible = true
    },
    downloadFile(file) {
      // 实际项目中调用后端下载接口
      window.open(`/api/files/${file.id}/download`)
      this.$message.success(`开始下载：${file.name}`)
      
      // 模拟下载计数+1
      file.downloadCount++
    }
  },
  watch: {
    fileType() { this.currentPage = 1 },
    sortBy() { this.currentPage = 1 }
  }
}
</script>

<style scoped lang="scss">
.page-banner {
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  background: var(--primary-blue);
  color: #fff;

  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/docs-banner.jpg') center/cover;
    opacity: 0.2;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 10px;
  }

  .banner-desc {
    font-size: 18px;
    margin-bottom: 15px;
    opacity: 0.9;
  }

  .breadcrumb {
    font-size: 14px;
    opacity: 0.8;

    a {
      color: #fff;
      &:hover { text-decoration: underline; }
    }

    i { margin: 0 10px; }
  }
}

.docs-filter-section {
  padding: 30px 0;
  background: var(--bg-light);
  border-bottom: 1px solid #e8e8e8;

  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .search-box {
    display: flex;
    gap: 10px;

    .el-input {
      width: 400px;
    }
  }

  .filter-options {
    display: flex;
    gap: 15px;

    .el-select {
      width: 140px;
    }
  }
}

.docs-content-section {
  padding: 50px 0;

  .docs-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 40px;
  }
}

.category-sidebar {
  background: #fff;
  border-radius: var(--border-radius);
  padding: 25px;
  box-shadow: var(--shadow-card);
  height: fit-content;
  position: sticky;
  top: 100px;

  .sidebar-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-main);
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--bg-light);
  }

  .category-tree {
    :deep(.el-tree-node__content) {
      padding: 8px 0;
    }

    :deep(.el-tree-node__label) {
      flex: 1;
    }
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .node-label {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
}

.file-list-area {
  .list-header {
    margin-bottom: 30px;

    .list-title {
      font-size: 24px;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 15px;

      .file-count {
        font-size: 14px;
        color: var(--text-light);
        font-weight: normal;
      }
    }
  }
}

.file-grid {
  display: grid;
  gap: 20px;
}

.file-card {
  display: grid;
  grid-template-columns: 60px 1fr 180px;
  gap: 20px;
  align-items: center;
  background: #fff;
  padding: 25px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-card);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  }

  .file-icon {
    width: 60px;
    height: 60px;
    background: var(--bg-light);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 28px;
      color: var(--primary-blue);
    }
  }

  .file-info {
    .file-name {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-main);
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .file-meta {
      display: flex;
      gap: 15px;
      margin-bottom: 10px;
      font-size: 13px;
      color: var(--text-light);

      i {
        margin-right: 4px;
      }
    }

    .file-desc {
      font-size: 14px;
      color: var(--text-light);
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .file-stats {
      display: flex;
      align-items: center;
      gap: 15px;
      font-size: 13px;
      color: var(--text-light);

      i {
        margin-right: 4px;
      }
    }
  }

  .file-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.preview-container {
  min-height: 600px;

  .preview-frame {
    width: 100%;
    height: 600px;
    border: none;
  }

  .preview-unsupported {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;
    color: var(--text-light);

    i {
      font-size: 48px;
      margin-bottom: 20px;
      color: #e6a23c;
    }

    p {
      margin-bottom: 20px;
    }
  }
}

@media (max-width: 992px) {
  .docs-layout {
    grid-template-columns: 1fr;
  }

  .category-sidebar {
    position: static;
  }

  .file-card {
    grid-template-columns: 1fr;
    text-align: center;

    .file-info {
      .file-meta,
      .file-stats {
        justify-content: center;
      }
    }

    .file-actions {
      flex-direction: row;
      justify-content: center;
    }
  }

  .filter-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    .el-input {
      width: 100%;
    }
  }
}
</style>