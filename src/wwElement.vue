<template>
  <transition name="help-guide-fade">
    <div v-if="content.visible" class="help-guide-overlay" @click.self="closeHelpGuide">
      <div class="help-guide-container">
        <!-- Header -->
        <div class="help-guide-header">
          <h2 class="help-guide-title">
            <svg class="help-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Solar Estimator Help Guide
          </h2>
          <button class="close-button" @click="closeHelpGuide" type="button" aria-label="Close help guide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="help-guide-content">
          <!-- Getting Started Section -->
          <section class="help-section">
            <h3 class="section-title">Getting Started</h3>
            <p class="section-intro">Follow these steps to generate your personalized solar estimate:</p>
            
            <div class="help-item">
              <span class="step-number">1</span>
              <div class="step-content">
                <h4>Complete Personal Information</h4>
                <p>All fields in the Personal Information section are <strong>mandatory</strong>. This ensures we can provide you with an accurate estimate and contact you with your results.</p>
              </div>
            </div>

            <div class="help-item">
              <span class="step-number">2</span>
              <div class="step-content">
                <h4>Select Your System Type</h4>
                <p>The <strong>"What type of system are you interested in?"</strong> field is mandatory. After selecting, click <span class="highlight-button">Confirm system selection</span> to ensure relevant packages appear below.</p>
              </div>
            </div>

            <div class="help-item">
              <span class="step-number">3</span>
              <div class="step-content">
                <h4>Enter Your Energy Usage</h4>
                <p>For personalized recommendations, fill in the <strong>Monthly Energy Bill</strong> field. This helps the estimator highlight the most suitable package for your needs.</p>
              </div>
            </div>
          </section>

          <!-- Sales Coach Section -->
          <section class="help-section">
            <h3 class="section-title">Using the Sales Coach</h3>
            <p class="section-intro">Our intelligent Sales Coach provides personalized insights and recommendations.</p>
            
            <div class="coach-requirements">
              <h4>Requirements for Sales Coach:</h4>
              <ul>
                <li>System type selection (mandatory)</li>
                <li>Monthly energy bill data (for accurate estimates)</li>
              </ul>
              <p class="note">The Sales Coach uses this information to provide savings estimates and recommendations on your selected package.</p>
            </div>
          </section>

          <!-- Optional Fields Section -->
          <section class="help-section">
            <h3 class="section-title">Additional Information</h3>
            <p>The <strong>System Preferences</strong> and <strong>House Details</strong> sections provide valuable information for a more accurate estimate but are not mandatory. These can be skipped if you need a quick estimate.</p>
          </section>

          <!-- Package Generation Section -->
          <section class="help-section">
            <h3 class="section-title">Generating Your Packages</h3>
            
            <div class="help-item">
              <div class="icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="9" y1="9" x2="15" y2="9"/>
                  <line x1="9" y1="15" x2="15" y2="15"/>
                </svg>
              </div>
              <div class="step-content">
                <p>Click <span class="highlight-button">Generate Package Options</span> to view recommended packages based on your system preference and energy usage.</p>
                <p class="warning">⚠️ Note: Packages will only appear if both system type and energy bill data are provided.</p>
              </div>
            </div>
          </section>

          <!-- Interactive Features Section -->
          <section class="help-section">
            <h3 class="section-title">Interactive Features</h3>
            
            <div class="feature-grid">
              <div class="feature-item">
                <h4>Share with Sales Coach</h4>
                <p>Click <span class="highlight-button">Share data with Sales Coach</span> to send your form data and selected package to the Sales Coach for detailed analysis.</p>
              </div>
              
              <div class="feature-item">
                <h4>Dynamic Questions</h4>
                <p>After sharing data, dynamic questions appear in the chat interface. Click any suggested question or type your own to interact with the bot.</p>
              </div>
              
              <div class="feature-item">
                <h4>Contextual Responses</h4>
                <p>The Sales Coach remembers your information throughout the conversation, providing personalized recommendations based on your specific situation.</p>
              </div>
            </div>
          </section>

          <!-- Quote Generation Section -->
          <section class="help-section">
            <h3 class="section-title">Finalizing Your Quote</h3>
            
            <ol class="process-list">
              <li>
                <strong>Review Summary:</strong> Open the "Quote Summary" section and click <span class="highlight-button">Update Summary</span> to consolidate all your information.
              </li>
              <li>
                <strong>Verify Data:</strong> Review all fields carefully. Any missing mandatory fields will be highlighted.
              </li>
              <li>
                <strong>Generate Quote:</strong> Click <span class="highlight-button">Generate Quote</span> to create your personalized estimate.
              </li>
              <li>
                <strong>Send Estimate:</strong> Click <span class="highlight-button">Finalize and Send Estimate</span> to receive your quote via email.
              </li>
            </ol>
          </section>

          <!-- Next Steps Section -->
          <section class="help-section">
            <h3 class="section-title">What Happens Next?</h3>
            <div class="next-steps">
              <p>After receiving your estimate email, you can:</p>
              <ul>
                <li>Review your personalized solar solution details</li>
                <li>Click "Request a Formal Quote" in the email</li>
                <li>Receive a comprehensive proposal within 48 hours (working days)</li>
              </ul>
            </div>
          </section>

          <!-- Footer -->
          <div class="help-footer">
            <p>Need additional assistance? Contact our solar experts at <strong>1300 RACQ SOLAR</strong></p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RACQHelpGuide',
  
  props: {
    content: {
      type: Object,
      default: () => ({
        visible: false
      })
    }
  },
  
  methods: {
    closeHelpGuide() {
      this.$emit('trigger-event', {
        name: 'close:help-guide',
        event: {
          timestamp: new Date().toISOString()
        }
      })
    }
  },
  
  mounted() {
    // Close on ESC key
    const handleEscape = (e) => {
      if (e.key === 'Escape' && this.content.visible) {
        this.closeHelpGuide()
      }
    }
    window.addEventListener('keydown', handleEscape)
    
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('keydown', handleEscape)
    })
  }
}
</script>

<style scoped>
/* Overlay and animations */
.help-guide-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
  overflow-y: auto;
}

.help-guide-container {
  background-color: #001f3f;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

/* Header */
.help-guide-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
}

.help-guide-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  color: #FFFFFF;
  font-size: 1.5rem;
  font-weight: 600;
}

.help-icon {
  width: 28px;
  height: 28px;
  color: #FFE600;
}

.close-button {
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  color: #FFFFFF;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close-button svg {
  width: 24px;
  height: 24px;
}

/* Content */
.help-guide-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  color: #FFFFFF;
}

/* Sections */
.help-section {
  margin-bottom: 2.5rem;
}

.help-section:last-child {
  margin-bottom: 0;
}

.section-title {
  color: #FFE600;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.section-intro {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Help items */
.help-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: #FFE600;
  color: #001f3f;
  border-radius: 50%;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.5rem 0;
  color: #FFFFFF;
  font-size: 1.1rem;
}

.step-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

/* Coach requirements */
.coach-requirements {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.coach-requirements h4 {
  margin: 0 0 0.75rem 0;
  color: #FFE600;
}

.coach-requirements ul {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.coach-requirements li {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.note {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-style: italic;
}

/* Feature grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item h4 {
  margin: 0 0 0.75rem 0;
  color: #FFE600;
  font-size: 1rem;
}

.feature-item p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Process list */
.process-list {
  margin: 0;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.process-list li {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.process-list strong {
  color: #FFFFFF;
}

/* Highlight elements */
.highlight-button {
  background-color: rgba(255, 230, 0, 0.2);
  color: #FFE600;
  padding: 0.125rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.warning {
  color: #FFE600;
  font-size: 0.9rem;
}

/* Icon wrapper */
.icon-wrapper {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFE600;
  flex-shrink: 0;
}

.icon-wrapper svg {
  width: 24px;
  height: 24px;
}

/* Next steps */
.next-steps {
  background-color: rgba(255, 230, 0, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 230, 0, 0.3);
}

.next-steps p {
  margin: 0 0 1rem 0;
  color: #FFFFFF;
  font-weight: 500;
}

.next-steps ul {
  margin: 0;
  padding-left: 1.5rem;
}

.next-steps li {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

/* Footer */
.help-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.help-footer p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

.help-footer strong {
  color: #FFE600;
}

/* Animations */
.help-guide-fade-enter-active,
.help-guide-fade-leave-active {
  transition: opacity 0.3s ease;
}

.help-guide-fade-enter,
.help-guide-fade-leave-to {
  opacity: 0;
}

.help-guide-fade-enter .help-guide-container,
.help-guide-fade-leave-to .help-guide-container {
  transform: scale(0.95);
}

.help-guide-fade-enter-active .help-guide-container,
.help-guide-fade-leave-active .help-guide-container {
  transition: transform 0.3s ease;
}

/* Scrollbar styling */
.help-guide-content::-webkit-scrollbar {
  width: 8px;
}

.help-guide-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.help-guide-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.help-guide-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Responsive design */
@media (max-width: 768px) {
  .help-guide-overlay {
    padding: 0;
  }
  
  .help-guide-container {
    max-height: 100vh;
    height: 100vh;
    border-radius: 0;
  }
  
  .help-guide-header {
    padding: 1.25rem;
  }
  
  .help-guide-title {
    font-size: 1.25rem;
  }
  
  .help-guide-content {
    padding: 1.5rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .help-guide-header {
    padding: 1rem;
  }
  
  .help-guide-title {
    font-size: 1.125rem;
  }
  
  .help-icon {
    width: 24px;
    height: 24px;
  }
  
  .help-guide-content {
    padding: 1.25rem;
  }
  
  .section-title {
    font-size: 1.125rem;
  }
}
</style>