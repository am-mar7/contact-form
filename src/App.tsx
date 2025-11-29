import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    mode: 'onBlur', // Validate on blur
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    setSubmittedData(data);
    setIsSubmitted(true);
    reset(); // Clear the form
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Mail size={40} style={styles.headerIcon} />
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>We'd love to hear from you! Fill out the form below.</p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div style={styles.successMessage}>
            <CheckCircle size={24} style={styles.successIcon} />
            <div>
              <h3 style={styles.successTitle}>Message Sent Successfully!</h3>
              <p style={styles.successText}>
                Thank you, <strong>{submittedData?.name}</strong>! We'll get back to you soon at{' '}
                <strong>{submittedData?.email}</strong>.
              </p>
            </div>
          </div>
        )}

        <div style={styles.formContainer}>
          {/* Name Field */}
          <div style={styles.formGroup}>
            <label htmlFor="name" style={styles.label}>
              <User size={18} style={styles.labelIcon} />
              Name <span style={styles.required}>*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              style={{
                ...styles.input,
                ...(errors.name ? styles.inputError : {}),
              }}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
                maxLength: {
                  value: 50,
                  message: 'Name must not exceed 50 characters',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: 'Name can only contain letters and spaces',
                },
              })}
            />
            {errors.name && (
              <div style={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{errors.name.message}</span>
              </div>
            )}
          </div>

          {/* Email Field */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              <Mail size={18} style={styles.labelIcon} />
              Email <span style={styles.required}>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              style={{
                ...styles.input,
                ...(errors.email ? styles.inputError : {}),
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <div style={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Message Field */}
          <div style={styles.formGroup}>
            <label htmlFor="message" style={styles.label}>
              <MessageSquare size={18} style={styles.labelIcon} />
              Message <span style={styles.required}>*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Type your message here..."
              style={{
                ...styles.textarea,
                ...(errors.message ? styles.inputError : {}),
              }}
              {...register('message', {
                required: 'Message is required',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters',
                },
                maxLength: {
                  value: 500,
                  message: 'Message must not exceed 500 characters',
                },
              })}
            />
            {errors.message && (
              <div style={styles.errorMessage}>
                <AlertCircle size={16} />
                <span>{errors.message.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              ...(isSubmitting ? styles.submitButtonDisabled : {}),
            }}
          >
            {isSubmitting ? (
              <>
                <div style={styles.spinner} />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            All fields marked with <span style={styles.required}>*</span> are required
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '600px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  headerIcon: {
    color: '#667eea',
    marginBottom: '10px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5',
  },
  successMessage: {
    display: 'flex',
    gap: '12px',
    backgroundColor: '#e8f5e9',
    border: '2px solid #4caf50',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px',
    animation: 'slideIn 0.3s ease-out',
  },
  successIcon: {
    color: '#4caf50',
    flexShrink: 0,
  },
  successTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: '4px',
  },
  successText: {
    fontSize: '14px',
    color: '#2e7d32',
    lineHeight: '1.5',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  labelIcon: {
    color: '#667eea',
  },
  required: {
    color: '#f44336',
  },
  input: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  inputError: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#f44336',
    marginTop: '4px',
  },
  submitButton: {
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'all 0.3s',
    marginTop: '10px',
  },
  submitButtonDisabled: {
    backgroundColor: '#9e9e9e',
    cursor: 'not-allowed',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  footer: {
    marginTop: '24px',
    paddingTop: '24px',
    borderTop: '1px solid #e0e0e0',
  },
  footerText: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
  },
};

// Add keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  input:focus, textarea:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  button:hover:not(:disabled) {
    background-color: #5568d3 !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  button:active:not(:disabled) {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

export default function App() {
  return <ContactForm />;
}