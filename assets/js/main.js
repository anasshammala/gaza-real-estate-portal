/**
 * Gaza Real Estate Portal - Main JavaScript File
 */

// Sample Data for Properties
window.sampleProperties = [
  {
    id: 1,
    title: 'شقة سكنية فاخرة',
    location: 'غزة - الرمال',
    price: '120,000 دولار',
    type: 'شقة',
    status: 'للبيع',
    area: '150 م²',
    rooms: 3,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-sale'
  },
  {
    id: 2,
    title: 'فيلا حديثة التصميم',
    location: 'خانيونس - البلد',
    price: '400 دولار / شهرياً',
    type: 'فيلا',
    status: 'للإيجار',
    area: '300 م²',
    rooms: 5,
    bathrooms: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-rent'
  },
  {
    id: 3,
    title: 'أرض زراعية',
    location: 'الشمال - بيت لاهيا',
    price: '50,000 دولار',
    type: 'أرض',
    status: 'للبيع',
    area: '1000 م²',
    rooms: 0,
    bathrooms: 0,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-sale'
  },
  {
    id: 4,
    title: 'مكتب تجاري مجهز',
    location: 'غزة - النصر',
    price: '1,200 دولار / شهرياً',
    type: 'مكتب',
    status: 'للإيجار',
    area: '85 م²',
    rooms: 2,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-rent'
  },
  {
    id: 5,
    title: 'منزل مستقل',
    location: 'رفح - تل السلطان',
    price: '85,000 دولار',
    type: 'منزل',
    status: 'للبيع',
    area: '200 م²',
    rooms: 4,
    bathrooms: 2,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-sale'
  },
  {
    id: 6,
    title: 'شقة عائلية',
    location: 'الوسطى - النصيرات',
    price: '60,000 دولار',
    type: 'شقة',
    status: 'للبيع',
    area: '130 م²',
    rooms: 3,
    bathrooms: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    badgeClass: 'badge-for-sale'
  }
];

// Function to render a property card
window.renderPropertyCard = function(property) {
  let featuresHtml = `<span><i class="bi bi-arrows-fullscreen text-accent"></i> ${property.area}</span>`;
  
  if (property.rooms > 0) {
    featuresHtml += `<span><i class="bi bi-door-closed text-accent"></i> ${property.rooms} غرف</span>`;
  }
  
  if (property.bathrooms > 0) {
    featuresHtml += `<span><i class="bi bi-droplet text-accent"></i> ${property.bathrooms} حمام</span>`;
  }

  return `
    <div class="col-md-6 col-lg-4">
      <div class="property-card">
        <div class="card-img-wrapper">
          <span class="badge-status ${property.badgeClass}">${property.status}</span>
          <img src="${property.image}" alt="${property.title}">
        </div>
        <div class="card-body">
          <div class="price">${property.price}</div>
          <h5 class="mt-2 text-primary-custom fs-6">${property.title}</h5>
          <div class="location"><i class="bi bi-geo-alt me-1"></i> ${property.location}</div>
          <div class="features">
            ${featuresHtml}
          </div>
          <a href="property-details.html" class="btn btn-outline-primary-custom w-100 mt-3 font-cairo fw-600">عرض التفاصيل</a>
        </div>
      </div>
    </div>
  `;
};

// DOM CONTENT LOADED EVENT
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  // 2. Sidebar Toggle (Dashboards / Admin)
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', function() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.toggle('open');
      }
    });
  }

  // 3. Search Tabs (Home Page Hero)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // 4. Render Featured Properties (Home Page)
  const featuredContainer = document.getElementById('featuredProperties');
  if (featuredContainer && window.sampleProperties) {
    featuredContainer.innerHTML = '';
    window.sampleProperties.slice(0, 6).forEach(p => {
      featuredContainer.innerHTML += window.renderPropertyCard(p);
    });
  }

  // 5. Dynamic Browse Properties Filtering (properties.html)
  const propertiesGrid = document.getElementById('propertiesGrid');
  if (propertiesGrid && window.sampleProperties) {
    
    const filterKeyword = document.getElementById('filterKeyword');
    const filterType = document.getElementById('filterType');
    const filterStatus = document.getElementById('filterStatus');
    const filterLocation = document.getElementById('filterLocation');
    const filterForm = document.getElementById('filterForm');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');

    // Function to render property grid based on filtered array
    function renderFilteredGrid(filteredList) {
      propertiesGrid.innerHTML = '';
      if (filteredList.length === 0) {
        propertiesGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="bi bi-info-circle display-1 text-muted mb-3"></i>
            <h4 class="text-muted fw-bold">عذراً، لم نجد أي عقار يطابق خيارات البحث الحالية.</h4>
            <p class="text-secondary">يرجى تعديل الفلاتر أو مسح التصفية للمحاولة مجدداً.</p>
          </div>
        `;
        return;
      }
      filteredList.forEach(p => {
        propertiesGrid.innerHTML += window.renderPropertyCard(p);
      });
    }

    // Function to run the actual filter calculation
    function applyPropertiesFilter() {
      const selectedKeyword = filterKeyword ? filterKeyword.value.trim().toLowerCase() : '';
      const selectedType = filterType ? filterType.value : '';
      const selectedStatusVal = filterStatus ? filterStatus.value : ''; // 'sale' or 'rent'
      const selectedLocation = filterLocation ? filterLocation.value : '';

      // Map status filter value to Arabic text in DB
      let targetStatus = '';
      if (selectedStatusVal === 'sale') targetStatus = 'للبيع';
      if (selectedStatusVal === 'rent') targetStatus = 'للإيجار';

      const filtered = window.sampleProperties.filter(property => {
        // Filter by Keyword (search in title, location, type, status)
        if (selectedKeyword) {
          const titleMatch = property.title.toLowerCase().includes(selectedKeyword);
          const locationMatch = property.location.toLowerCase().includes(selectedKeyword);
          const typeMatch = property.type.toLowerCase().includes(selectedKeyword);
          const statusMatch = property.status.toLowerCase().includes(selectedKeyword);
          if (!titleMatch && !locationMatch && !typeMatch && !statusMatch) {
            return false;
          }
        }
        // Filter by Type
        if (selectedType && property.type !== selectedType) {
          return false;
        }
        // Filter by Status (Purpose)
        if (targetStatus && property.status !== targetStatus) {
          return false;
        }
        // Filter by Location
        if (selectedLocation && !property.location.includes(selectedLocation)) {
          return false;
        }
        return true;
      });

      renderFilteredGrid(filtered);
    }

    // Bind event listeners to filters for live filtering
    [filterKeyword, filterType, filterStatus, filterLocation].forEach(el => {
      if (el) {
        el.addEventListener('input', applyPropertiesFilter);
        el.addEventListener('change', applyPropertiesFilter);
      }
    });

    if (filterForm) {
      filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyPropertiesFilter();
      });
    }

    // Clear Filters Button Logic
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', function() {
        if (filterKeyword) filterKeyword.value = '';
        if (filterType) filterType.value = '';
        if (filterStatus) filterStatus.value = '';
        if (filterLocation) filterLocation.value = '';
        // Clear url parameters if any
        if (window.history.pushState) {
          const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.pushState({path: newurl}, '', newurl);
        }
        renderFilteredGrid(window.sampleProperties);
      });
    }

    // Check for query parameters in URL (e.g. ?search=VALUE or ?type=شقة or ?status=sale) when page loads
    const urlParams = new URLSearchParams(window.location.search);
    let hasParams = false;
    
    if (urlParams.has('search') && filterKeyword) {
      const searchParam = urlParams.get('search');
      filterKeyword.value = searchParam;
      hasParams = true;
    }
    if (urlParams.has('type') && filterType) {
      const typeParam = urlParams.get('type');
      filterType.value = typeParam;
      hasParams = true;
    }
    if (urlParams.has('status') && filterStatus) {
      const statusParam = urlParams.get('status');
      filterStatus.value = statusParam;
      hasParams = true;
    }
    if (urlParams.has('location') && filterLocation) {
      const locationParam = urlParams.get('location');
      filterLocation.value = locationParam;
      hasParams = true;
    }

    if (hasParams) {
      applyPropertiesFilter();
    } else {
      renderFilteredGrid(window.sampleProperties);
    }
  }

  // 6. Details Page Contact Reveal (property-details.html)
  const callContactBtn = document.getElementById('callContactBtn');
  if (callContactBtn) {
    callContactBtn.addEventListener('click', function() {
      const phone = this.getAttribute('data-phone');
      const phoneText = document.getElementById('phoneText');
      if (phoneText) {
        phoneText.textContent = phone;
      }
      this.classList.remove('btn');
      this.classList.add('btn-success');
      // Create second click redirect
      this.addEventListener('click', function() {
        window.location.href = `tel:${phone}`;
      });
    });
  }

  // 7. Add Property Image Validation & Upload Click (dashboard/add-property.html)
  const uploadZone = document.getElementById('uploadZone');
  const propertyImages = document.getElementById('propertyImages');
  if (uploadZone && propertyImages) {
    uploadZone.addEventListener('click', function() {
      propertyImages.click();
    });
  }

  if (propertyImages) {
    propertyImages.addEventListener('change', function() {
      const errorMsg = document.getElementById('imageError');
      const preview = document.getElementById('imagePreview');
      if (preview) preview.innerHTML = '';

      if (this.files.length < 3 || this.files.length > 5) {
        if (errorMsg) errorMsg.classList.remove('d-none');
        this.setCustomValidity('يجب اختيار من 3 إلى 5 صور للعقار.');
      } else {
        if (errorMsg) errorMsg.classList.add('d-none');
        this.setCustomValidity('');
        Array.from(this.files).forEach(file => {
          const reader = new FileReader();
          reader.onload = function(e) {
            if (preview) {
              preview.innerHTML += `<img src="${e.target.result}" class="rounded-3 border img-80-80">`;
            }
          };
          reader.readAsDataURL(file);
        });
      }
    });
  }

  const addPropertyForm = document.getElementById('addPropertyForm');
  if (addPropertyForm && propertyImages) {
    addPropertyForm.addEventListener('submit', function(e) {
      if (propertyImages.files.length < 3 || propertyImages.files.length > 5) {
        e.preventDefault();
        const errorMsg = document.getElementById('imageError');
        if (errorMsg) errorMsg.classList.remove('d-none');
        alert('يرجى التحقق من رفع من 3 إلى 5 صور للعقار للمتابعة.');
      }
    });
  }

  // 8. Edit Property Actions (dashboard/edit-property.html)
  // Delete current image
  document.querySelectorAll('.btn-delete-img').forEach(btn => {
    btn.addEventListener('click', function() {
      this.parentElement.remove();
    });
  });

  // 9. Dashboard Row Deletion Interaction (dashboard/user-index.html)
  const userPropertiesTable = document.getElementById('userPropertiesTable');
  if (userPropertiesTable) {
    userPropertiesTable.querySelectorAll('.action-btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        if (row && confirm('هل أنت متأكد من رغبتك في حذف هذا العقار؟')) {
          row.style.transition = 'all 0.4s ease';
          row.style.opacity = '0';
          row.style.transform = 'translateX(-20px)';
          setTimeout(() => {
            row.remove();
            // Decrement total stats
            const totalStat = document.querySelector('.stat-value');
            if (totalStat) {
              const val = parseInt(totalStat.textContent, 10);
              if (!isNaN(val) && val > 0) {
                totalStat.textContent = val - 1;
              }
            }
          }, 400);
        }
      });
    });
  }

  // 10. Admin Manage Properties Interaction (admin/manage-properties.html)
  const adminFilterStatus = document.getElementById('adminFilterStatus');
  const adminPropertiesTable = document.getElementById('adminPropertiesTable');
  if (adminFilterStatus && adminPropertiesTable) {
    adminFilterStatus.addEventListener('change', function() {
      const filterVal = this.value.trim();
      adminPropertiesTable.querySelectorAll('tbody tr').forEach(row => {
        const badgeSpan = row.querySelector('.badge-custom');
        if (badgeSpan) {
          const statusText = badgeSpan.textContent.trim();
          if (filterVal === 'الكل' || statusText === filterVal) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        }
      });
    });
  }

  if (adminPropertiesTable) {
    // Approve Simulation
    adminPropertiesTable.querySelectorAll('.action-btn-approve').forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const badge = row.querySelector('.badge-custom');
        if (badge) {
          badge.className = 'badge-custom badge-success';
          badge.textContent = 'معتمد';
        }
        this.style.transition = 'opacity 0.3s ease';
        this.style.opacity = '0';
        setTimeout(() => this.remove(), 300);
      });
    });

    // Reject/Delete Simulation
    adminPropertiesTable.querySelectorAll('.action-btn-delete').forEach(btn => {
      btn.addEventListener('click', function() {
        const row = this.closest('tr');
        const badge = row.querySelector('.badge-custom');
        if (badge) {
          badge.className = 'badge-custom badge-danger';
          badge.textContent = 'مرفوض';
        }
        this.style.transition = 'opacity 0.3s ease';
        this.style.opacity = '0';
        setTimeout(() => this.remove(), 300);
      });
    });
  }

  // 11. Property Gallery Thumbnails Click (property-details.html)
  const mainGalleryImg = document.getElementById('mainGalleryImg');
  if (mainGalleryImg) {
    document.querySelectorAll('.thumb-img').forEach(thumb => {
      thumb.addEventListener('click', function() {
        mainGalleryImg.src = this.src;
      });
    });
  }

  // 12. Home Page Search Transfer Form Submission Hook (index.html)
  const heroSearchForm = document.getElementById('heroSearchForm');
  if (heroSearchForm) {
    heroSearchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const searchVal = document.getElementById('heroSearchInput') ? document.getElementById('heroSearchInput').value.trim() : '';
      const typeVal = document.getElementById('propTypeSelect') ? document.getElementById('propTypeSelect').value : '';
      
      const areaSelect = document.querySelector('.hero-search-form select[name="area"]');
      const areaVal = areaSelect ? areaSelect.value : '';
      
      const activeTab = document.querySelector('.search-tabs .tab-btn.active');
      let purposeVal = '';
      if (activeTab) {
        const dataType = activeTab.getAttribute('data-type');
        if (dataType === 'buy') purposeVal = 'sale';
        if (dataType === 'rent') purposeVal = 'rent';
      }
      
      const params = [];
      if (searchVal) params.push(`search=${encodeURIComponent(searchVal)}`);
      if (typeVal) params.push(`type=${encodeURIComponent(typeVal)}`);
      if (areaVal) params.push(`location=${encodeURIComponent(areaVal)}`);
      if (purposeVal) params.push(`status=${encodeURIComponent(purposeVal)}`);
      
      const queryString = params.length > 0 ? '?' + params.join('&') : '';
      window.location.href = 'properties.html' + queryString;
    });
  }

});
