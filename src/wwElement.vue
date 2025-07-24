<template>
  <div>
    <!-- Overlay -->
    <div 
      v-if="content.visible" 
      class="help-guide-overlay"
      @click="closeHelp"
    ></div>

    <!-- Help Guide Panel -->
    <div 
      v-if="content.visible"
      ref="helpGuide"
      class="help-guide"
      :style="guideStyle"
    >
      <!-- Draggable Header -->
      <div 
        class="help-guide-header"
        @mousedown="startDrag"
      >
        <div class="help-guide-title">
          <div class="help-icon">?</div>
          <span>Solar Estimator Help Guide</span>
        </div>
        <button 
          class="close-button"
          @click="closeHelp"
          type="button"
          aria-label="Close help guide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content Area -->
      <div class="help-guide-content">
        <!-- Search Box -->
        <div class="search-container">
          <input 
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search for help topics..."
          />
        </div>

        <!-- Accordion Sections -->
        <div v-for="(section, index) in filteredSections" :key="index" class="accordion-section">
          <button 
            class="accordion-header"
            :class="{ active: activeSection === index }"
            @click="toggleSection(index)"
            type="button"
          >
            <span>{{ section.title }}</span>
            <svg class="accordion-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 7.5L10 12.5L15 7.5"/>
            </svg>
          </button>
          <div 
            class="accordion-content"
            :class="{ active: activeSection === index }"
          >
            <div v-html="section.content"></div>
          </div>
        </div>

        <!-- Contact Section -->
        <div class="contact-section">
          <p>Need assistance? Contact <a href="mailto:automations@racqsolar.com.au">automations@racqsolar.com.au</a></p>
        </div>
      </div>

      <!-- Resize Handle -->
      <div 
        class="resize-handle"
        @mousedown="startResize"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RACQHelpGuideComponent',
  
  props: {
    content: {
      type: Object,
      default: () => ({
        visible: false,
        activeSection: ''
      })
    }
  },
  
  data() {
    return {
      searchQuery: '',
      activeSection: null,
      isDragging: false,
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      position: {
        x: window.innerWidth - 520,
        y: 80
      },
      size: {
        width: 500,
        height: 600
      },
      sections: [
        {
          title: 'Personal Information',
          content: `
            <h3>CUSTOMER DETAILS</h3>
            <p>Enter the customer's personal information accurately. This data will be used for quote generation and follow-up communications.</p>
            <ul>
              <li>First Name and Last Name are mandatory fields</li>
              <li>Email address must be valid for quote delivery</li>
              <li>Phone number should include area code</li>
              <li>Postcode determines available rebates and solar zones</li>
            </ul>
            <div class="tip-box">
              <strong>Tip:</strong> Double-check the email address to ensure the customer receives their quote.
            </div>
          `
        },
        {
          title: 'System Preferences & Energy Usage',
          content: `
            <h3>SYSTEM TYPE</h3>
            <p>Select the appropriate system configuration based on the customer's requirements:</p>
            <ul>
              <li><strong>Solar Only:</strong> Standard photovoltaic system without battery storage</li>
              <li><strong>Solar + Battery:</strong> Includes energy storage for evening use</li>
              <li><strong>Battery Only:</strong> For existing solar system upgrades</li>
            </ul>
            
            <h3>ENERGY CONSUMPTION</h3>
            <p>Accurate usage data ensures correct system sizing:</p>
            <ul>
              <li>Request a recent electricity bill for accurate kWh figures</li>
              <li>Use seasonal average if available</li>
              <li>Consider future energy needs (pool, EV charging, etc.)</li>
            </ul>
            
            <h3>TIME OF USE</h3>
            <p>Understanding consumption patterns optimises system design:</p>
            <ul>
              <li>High daytime use favours larger solar arrays</li>
              <li>Evening/night use indicates battery storage benefits</li>
              <li>Consider work-from-home arrangements</li>
            </ul>
          `
        },
        {
          title: 'House Details',
          content: `
            <h3>PROPERTY INFORMATION</h3>
            <p>Accurate property details ensure feasibility and correct installation pricing:</p>
            
            <h3>ROOF TYPE</h3>
            <ul>
              <li><strong>Tin/Colorbond:</strong> Standard installation, most cost-effective</li>
              <li><strong>Tile:</strong> Requires tile brackets, slightly higher installation cost</li>
              <li><strong>Kliplok:</strong> Requires special clamps, may affect warranty</li>
            </ul>
            
            <h3>STOREY HEIGHT</h3>
            <ul>
              <li>Single storey: Standard installation</li>
              <li>Double storey: Additional safety equipment required</li>
              <li>Three+ storeys: Specialist equipment, higher costs</li>
            </ul>
            
            <h3>ROOF PITCH</h3>
            <p>Affects both safety requirements and system performance:</p>
            <ul>
              <li>Flat (<15°): May require tilt frames</li>
              <li>Standard (15-30°): Optimal for most locations</li>
              <li>Steep (>30°): Additional safety measures needed</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Use Google Earth for preliminary roof assessments before site visits.
            </div>
          `
        },
        {
          title: 'Package Selection',
          content: `
            <h3>CHOOSING THE RIGHT PACKAGE</h3>
            <p>Package selection should balance customer needs, budget, and technical requirements:</p>
            
            <h3>SYSTEM SIZING</h3>
            <ul>
              <li>Review daily average consumption from bills</li>
              <li>Consider roof space limitations</li>
              <li>Factor in future energy needs</li>
              <li>Check grid connection limits with DNSP</li>
            </ul>
            
            <h3>RECOMMENDED PACKAGES</h3>
            <p>The system highlights recommended options based on:</p>
            <ul>
              <li>Energy consumption patterns</li>
              <li>Available roof space</li>
              <li>Budget considerations</li>
              <li>Payback period optimisation</li>
            </ul>
            
            <h3>CUSTOMISATION OPTIONS</h3>
            <ul>
              <li>Panel upgrades for premium efficiency</li>
              <li>Inverter sizing for future expansion</li>
              <li>Battery capacity based on evening usage</li>
              <li>Monitoring and smart home integration</li>
            </ul>
          `
        },
        {
          title: 'Quote Summary',
          content: `
            <h3>REVIEWING THE QUOTE</h3>
            <p>Before finalising, ensure all details are correct:</p>
            
            <h3>KEY ITEMS TO VERIFY</h3>
            <ul>
              <li>Customer details and contact information</li>
              <li>System specifications match discussions</li>
              <li>Installation address is correct</li>
              <li>All applicable rebates are included</li>
            </ul>
            
            <h3>FINANCIAL SUMMARY</h3>
            <ul>
              <li><strong>System Cost:</strong> Total equipment and installation</li>
              <li><strong>Rebates:</strong> Federal and state incentives applied</li>
              <li><strong>Net Cost:</strong> Final amount payable by customer</li>
              <li><strong>Savings Estimate:</strong> Based on current usage and tariffs</li>
            </ul>
            
            <h3>NEXT STEPS</h3>
            <ul>
              <li>Generate PDF quote for customer</li>
              <li>Schedule follow-up within 48 hours</li>
              <li>Book site inspection if proceeding</li>
              <li>Prepare finance options if requested</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Always offer to walk through the quote with the customer to address any questions.
            </div>
          `
        }
      ]
    }
  },
  
  computed: {
    filteredSections() {
      if (!this.searchQuery) return this.sections
      
      const query = this.searchQuery.toLowerCase()
      return this.sections.filter(section => {
        return section.title.toLowerCase().includes(query) ||
               section.content.toLowerCase().includes(query)
      })
    },
    
    guideStyle() {
      return {
        left: `${this.position.x}px`,
        top: `${this.position.y}px`,
        width: `${this.size.width}px`,
        height: `${this.size.height}px`
      }
    }
  },
  
  watch: {
    'content.visible': {
      handler(newVal) {
        if (newVal) {
          this.$emit('trigger-event', {
            name: 'help:opened',
            payload: {
              timestamp: new Date().toISOString()
            }
          })
          // Center on first open if never positioned
          if (this.position.x === window.innerWidth - 520) {
            this.centerGuide()
          }
        }
      },
      immediate: true
    }
  },
  
  mounted() {
    // Listen for toggle event from header
    window.addEventListener('toggleHelpGuide', this.toggleHelp)
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  },
  
  beforeDestroy() {
    window.removeEventListener('toggleHelpGuide', this.toggleHelp)
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  },
  
  methods: {
    toggleHelp() {
      // Toggle the visible property through WeWeb
      this.$emit('update:visible', !this.content.visible)
    },
    
    closeHelp() {
      // Update visible property through WeWeb
      this.$emit('update:visible', false)
      this.activeSection = null
      this.searchQuery = ''
      this.$emit('trigger-event', {
        name: 'help:closed',
        payload: {
          timestamp: new Date().toISOString()
        }
      })
    },
    
    toggleSection(index) {
      this.activeSection = this.activeSection === index ? null : index
    },
    
    centerGuide() {
      this.position.x = (window.innerWidth - this.size.width) / 2
      this.position.y = (window.innerHeight - this.size.height) / 2
    },
    
    startDrag(e) {
      this.isDragging = true
      this.startX = e.clientX - this.position.x
      this.startY = e.clientY - this.position.y
      e.preventDefault()
    },
    
    startResize(e) {
      this.isResizing = true
      this.startX = e.clientX
      this.startY = e.clientY
      this.startWidth = this.size.width
      this.startHeight = this.size.height
      e.preventDefault()
    },
    
    handleMouseMove(e) {
      if (this.isDragging) {
        this.position.x = e.clientX - this.startX
        this.position.y = e.clientY - this.startY
        
        // Keep within viewport
        this.position.x = Math.max(0, Math.min(this.position.x, window.innerWidth - this.size.width))
        this.position.y = Math.max(0, Math.min(this.position.y, window.innerHeight - this.size.height))
      }
      
      if (this.isResizing) {
        this.size.width = Math.max(400, this.startWidth + e.clientX - this.startX)
        this.size.height = Math.max(300, this.startHeight + e.clientY - this.startY)
      }
    },
    
    handleMouseUp() {
      this.isDragging = false
      this.isResizing = false
    }
  }
}
</script>

<style scoped>
/* Help Guide Container */
.help-guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9998;
  animation: fadeIn 0.3s ease;
}

.help-guide {
  position: fixed;
  background: #001f3f;
  color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  min-width: 400px;
  min-height: 300px;
  animation: slideIn 0.3s ease;
}

/* Draggable header */
.help-guide-header {
  background: #001f3f;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: move;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px 8px 0 0;
  flex-shrink: 0;
}

.help-guide-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.help-icon {
  width: 24px;
  height: 24px;
  background: #FFE600;
  color: #001f3f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.close-button {
  background: transparent;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Content area */
.help-guide-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  min-height: 0;
}

/* Search box */
.search-container {
  margin-bottom: 1.5rem;
  position: sticky;
  top: -1.5rem;
  background: #001f3f;
  padding: 0 0 1rem 0;
  z-index: 5;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #FFFFFF;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
  border-color: #FFE600;
}

/* Accordion styles */
.accordion-section {
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  overflow: hidden;
}

.accordion-header {
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  padding: 1rem 1.5rem;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.accordion-header:hover {
  background: rgba(255, 255, 255, 0.1);
}

.accordion-header.active {
  background: rgba(255, 230, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.accordion-icon {
  transition: transform 0.2s ease;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.accordion-header.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.accordion-content.active {
  padding: 1.5rem;
  max-height: 2000px;
}

.accordion-content >>> h3 {
  color: #FFE600;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.accordion-content >>> p,
.accordion-content >>> li {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

.accordion-content >>> ul {
  list-style: none;
  padding-left: 0;
}

.accordion-content >>> ul li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.accordion-content >>> ul li:before {
  content: "•";
  color: #FFE600;
  font-weight: bold;
  position: absolute;
  left: 0;
}

.accordion-content >>> .tip-box {
  background: rgba(255, 230, 0, 0.1);
  border-left: 3px solid #FFE600;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0 6px 6px 0;
}

.accordion-content >>> .tip-box strong {
  color: #FFE600;
}

/* Contact section */
.contact-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.contact-section p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.contact-section a {
  color: #FFE600;
  text-decoration: none;
  font-weight: 500;
}

.contact-section a:hover {
  text-decoration: underline;
}

/* Resize handle */
.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(255, 255, 255, 0.3) 50%);
  border-radius: 0 0 8px 0;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .help-guide {
    min-width: 350px;
    max-width: calc(100vw - 20px);
  }
  
  .help-guide-title {
    font-size: 1.125rem;
  }
  
  .accordion-header {
    padding: 0.875rem 1.25rem;
    font-size: 0.9375rem;
  }
  
  .accordion-content.active {
    padding: 1.25rem;
  }
}

@media (max-width: 480px) {
  .help-guide {
    min-width: 300px;
    position: fixed;
    top: 10px !important;
    left: 10px !important;
    right: 10px !important;
    width: auto !important;
    height: calc(100vh - 20px) !important;
  }
  
  .help-guide-header {
    cursor: default;
  }
  
  .resize-handle {
    display: none;
  }
}
</style>