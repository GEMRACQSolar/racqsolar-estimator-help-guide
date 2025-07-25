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

        <!-- Getting Started Section -->
        <div class="getting-started-section">
          <h2>Getting Started</h2>
          <p>To generate an accurate solar estimate for your customer, you'll need to complete the following sections:</p>
          <ol>
            <li><strong>Personal Information</strong> - Customer contact details</li>
            <li><strong>System Preferences & Energy Usage</strong> - Power consumption and system requirements</li>
            <li><strong>House Details</strong> - Property specifications for installation</li>
            <li><strong>Package Selection</strong> - Choose from recommended solar packages</li>
            <li><strong>Quote Summary</strong> - Review and finalise the estimate</li>
          </ol>
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
            <p>This section captures essential customer information for quote generation and follow-up.</p>
            <ul>
              <li><strong>Required Fields:</strong> First Name, Last Name, Email, Phone, and Postcode</li>
              <li>Email address must be valid - quotes are automatically sent to this address</li>
              <li>Phone number should include area code for SMS notifications</li>
              <li>Postcode determines available rebates and solar zone classifications</li>
            </ul>
            
            <h3>ADDITIONAL INFORMATION</h3>
            <p>Optional fields that enhance customer experience:</p>
            <ul>
              <li><strong>Secondary Contact:</strong> Alternative person for installation coordination</li>
              <li><strong>Preferred Contact Method:</strong> Email, phone, or SMS preferences</li>
              <li><strong>Referral Source:</strong> Track marketing effectiveness</li>
              <li><strong>Special Requirements:</strong> Accessibility needs or site-specific considerations</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Double-check the email address and phone number. Incorrect details will prevent the customer from receiving their quote and booking confirmations.
            </div>
          `
        },
        {
          title: 'System Preferences & Energy Usage',
          content: `
            <h3>SYSTEM TYPE SELECTION</h3>
            <p>Choose the appropriate system configuration:</p>
            <ul>
              <li><strong>Solar Only:</strong> Standard PV system without battery storage</li>
              <li><strong>Solar + Battery:</strong> Complete system with energy storage for evening use</li>
              <li><strong>Battery Only:</strong> Add battery to existing solar installation</li>
            </ul>
            
            <h3>USING THE SALES COACH</h3>
            <p>The Sales Coach AI assistant requires specific information to generate optimal recommendations:</p>
            <ul>
              <li><strong>Energy Usage Data:</strong> Enter accurate kWh consumption from recent bills</li>
              <li><strong>Usage Patterns:</strong> Specify when electricity is primarily used (day/evening)</li>
              <li><strong>Future Needs:</strong> Consider upcoming changes (pool, EV, home office)</li>
            </ul>
            <p>Click "Chat with Sales Coach" to receive personalised system recommendations based on the customer's specific situation.</p>
            
            <h3>ENERGY CONSUMPTION ANALYSIS</h3>
            <p>Accurate usage data ensures correct system sizing:</p>
            <ul>
              <li>Request the last 4 electricity bills for seasonal variations</li>
              <li>Calculate daily average: Total kWh ÷ billing days</li>
              <li>Note any unusual consumption periods (holidays, renovations)</li>
              <li>Consider future energy needs: EVs, pools, home extensions</li>
            </ul>
            
            <h3>TIME OF USE PATTERNS</h3>
            <p>Understanding when energy is consumed optimises system design:</p>
            <ul>
              <li><strong>High Daytime Use:</strong> Larger solar arrays maximise self-consumption</li>
              <li><strong>Evening/Night Use:</strong> Battery storage essential for savings</li>
              <li><strong>Mixed Usage:</strong> Balanced system with moderate battery capacity</li>
              <li>Consider work-from-home arrangements and lifestyle changes</li>
            </ul>
          `
        },
        {
          title: 'House Details',
          content: `
            <h3>PROPERTY SPECIFICATIONS</h3>
            <p>Accurate property details ensure installation feasibility and correct pricing.</p>
            
            <h3>ROOF TYPE & MATERIAL</h3>
            <ul>
              <li><strong>Tin/Colorbond:</strong> Standard installation, most cost-effective</li>
              <li><strong>Tile (Concrete/Terracotta):</strong> Requires tile brackets, slightly higher cost</li>
              <li><strong>Kliplok:</strong> Special clamps needed, may affect system warranty</li>
              <li><strong>Slate:</strong> Specialist installation, significantly higher cost</li>
            </ul>
            
            <h3>STOREY HEIGHT</h3>
            <p>Height affects safety requirements and installation costs:</p>
            <ul>
              <li><strong>Single Storey:</strong> Standard installation procedures</li>
              <li><strong>Double Storey:</strong> Additional safety equipment, 10-15% higher cost</li>
              <li><strong>Three+ Storeys:</strong> Specialist equipment, custom quotation required</li>
            </ul>
            
            <h3>ROOF PITCH & ORIENTATION</h3>
            <ul>
              <li><strong>Flat (0-15°):</strong> May require tilt frames for optimal performance</li>
              <li><strong>Standard (15-30°):</strong> Ideal for most Australian locations</li>
              <li><strong>Steep (>30°):</strong> Additional safety measures, potential performance impact</li>
            </ul>
            
            <h3>ADDITIONAL CONSIDERATIONS</h3>
            <ul>
              <li><strong>Shading:</strong> Trees, buildings, or structures affecting panel placement</li>
              <li><strong>Roof Age:</strong> Roofs over 15 years may need inspection</li>
              <li><strong>Access:</strong> Side access width for equipment (minimum 900mm)</li>
              <li><strong>Switchboard:</strong> Location and upgrade requirements</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Use Google Earth or Nearmap for preliminary roof assessments. Look for optimal north-facing sections, check for shading, and estimate available roof space.
            </div>
          `
        },
        {
          title: 'Package Selection',
          content: `
            <h3>CHOOSING THE RIGHT PACKAGE</h3>
            <p>The system displays recommended packages based on the customer's energy profile.</p>
            
            <h3>PACKAGE RECOMMENDATIONS</h3>
            <p>Our AI analyses multiple factors to suggest optimal packages:</p>
            <ul>
              <li><strong>Energy Consumption:</strong> Matched to usage patterns</li>
              <li><strong>Roof Space:</strong> Maximum viable system size</li>
              <li><strong>Budget Indicators:</strong> Value-focused vs premium options</li>
              <li><strong>Payback Period:</strong> Optimised for fastest return on investment</li>
            </ul>
            
            <h3>INTERACTIVE FEATURES</h3>
            <p>The package selection interface includes:</p>
            <ul>
              <li><strong>Comparison View:</strong> Side-by-side package specifications</li>
              <li><strong>Savings Calculator:</strong> Projected savings over 10-25 years</li>
              <li><strong>Finance Options:</strong> Monthly payment calculations</li>
              <li><strong>Customisation:</strong> Adjust panel brands, inverter sizes, or battery capacity</li>
            </ul>
            
            <h3>SALES COACH INTEGRATION</h3>
            <p>Click "Ask Sales Coach" within any package to:</p>
            <ul>
              <li>Get detailed explanations of technical specifications</li>
              <li>Understand why this package was recommended</li>
              <li>Explore upgrade or downgrade options</li>
              <li>Address specific customer concerns or questions</li>
            </ul>
            
            <h3>CUSTOMISATION OPTIONS</h3>
            <ul>
              <li><strong>Panel Selection:</strong> Economy, standard, or premium efficiency</li>
              <li><strong>Inverter Sizing:</strong> Match to current needs or allow for expansion</li>
              <li><strong>Battery Capacity:</strong> Based on evening consumption analysis</li>
              <li><strong>Smart Features:</strong> Monitoring, optimisers, or EV charging</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Always present 3 options: Good, Better, Best. This gives customers choice while guiding them toward the middle option, which typically offers the best value.
            </div>
          `
        },
        {
          title: 'Quote Summary',
          content: `
            <h3>FINALISING YOUR QUOTE</h3>
            <p>Review all details before generating the final estimate.</p>
            
            <h3>VERIFICATION CHECKLIST</h3>
            <p>Before proceeding, verify:</p>
            <ul>
              <li>✓ Customer contact details are correct</li>
              <li>✓ System specifications match discussions</li>
              <li>✓ Installation address is accurate</li>
              <li>✓ All applicable rebates are included</li>
              <li>✓ Finance options have been discussed</li>
              <li>✓ Installation timeframe is understood</li>
            </ul>
            
            <h3>QUOTE COMPONENTS</h3>
            <ul>
              <li><strong>System Cost:</strong> Equipment and standard installation</li>
              <li><strong>Additional Costs:</strong> Switchboard upgrades, tilt frames, etc.</li>
              <li><strong>Rebates & Incentives:</strong> STCs, state rebates, feed-in tariffs</li>
              <li><strong>Net Investment:</strong> Final amount after all rebates</li>
              <li><strong>Savings Projection:</strong> 10-year savings based on current rates</li>
            </ul>
            
            <h3>GENERATING YOUR PACKAGES</h3>
            <p>The system automatically:</p>
            <ul>
              <li>Calculates accurate STC rebates based on postcode</li>
              <li>Applies current state incentives and rebates</li>
              <li>Generates professional PDF quotes</li>
              <li>Sends quotes directly to customer email</li>
              <li>Creates follow-up tasks in the CRM</li>
            </ul>
            
            <h3>WHAT HAPPENS NEXT</h3>
            <p>After quote generation:</p>
            <ol>
              <li><strong>Immediate:</strong> Customer receives email with quote PDF</li>
              <li><strong>30 minutes:</strong> Follow-up SMS confirming receipt</li>
              <li><strong>Day 1:</strong> Automated check-in email</li>
              <li><strong>Day 3:</strong> Phone call scheduled for questions</li>
              <li><strong>Week 1:</strong> Site inspection booking if proceeding</li>
            </ol>
            
            <h3>POST-QUOTE ACTIONS</h3>
            <ul>
              <li>Schedule follow-up call within 48 hours</li>
              <li>Prepare finance application if requested</li>
              <li>Book site inspection for interested customers</li>
              <li>Add to nurture campaign if not ready to proceed</li>
              <li>Update CRM with interaction notes</li>
            </ul>
            
            <div class="tip-box">
              <strong>Tip:</strong> Always offer to walk through the quote with the customer over the phone. This personal touch significantly increases conversion rates and allows you to address concerns immediately.
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

/* Getting Started Section */
.getting-started-section {
  background: rgba(255, 230, 0, 0.1);
  border: 1px solid rgba(255, 230, 0, 0.2);
  border-radius: 6px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.getting-started-section h2 {
  color: #FFE600;
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.getting-started-section p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.getting-started-section ol {
  list-style: none;
  counter-reset: item;
  padding-left: 0;
}

.getting-started-section ol li {
  counter-increment: item;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
  line-height: 1.6;
}

.getting-started-section ol li:before {
  content: counter(item);
  position: absolute;
  left: 0;
  top: 0;
  background: #FFE600;
  color: #001f3f;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.75rem;
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
  max-height: 3000px;
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

.accordion-content >>> ol {
  list-style: decimal;
  padding-left: 1.5rem;
}

.accordion-content >>> ol li {
  padding-left: 0.5rem;
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