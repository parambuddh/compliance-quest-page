/**
 * Email Service - Calls PHP backend
 * Works with BlueHost and other PHP hosting providers
 */

interface LeadFormData {
  name: string;
  email: string;
  contactNumber: string;
  company: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send lead form data to PHP backend for email processing
 * PHP endpoint: /php/send-email.php
 */
export const sendLeadEmail = async (formData: LeadFormData): Promise<EmailResponse> => {
  try {
    // Determine the PHP endpoint URL based on environment
    const phpEndpoint = import.meta.env.VITE_PHP_ENDPOINT || '/php/send-email.php';

    const response = await fetch(phpEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        company: formData.company,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message || 'Email sent successfully',
      };
    } else {
      return {
        success: false,
        message: result.error || 'Failed to send email',
        error: result.error,
      };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Network error: Unable to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Alternative: Send email using FormData (if needed)
 * Some servers may have issues with JSON, this provides a fallback
 */
export const sendLeadEmailFormData = async (formData: LeadFormData): Promise<EmailResponse> => {
  try {
    const phpEndpoint = import.meta.env.VITE_PHP_ENDPOINT || '/php/send-email.php';

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('contactNumber', formData.contactNumber);
    payload.append('company', formData.company);

    const response = await fetch(phpEndpoint, {
      method: 'POST',
      body: payload,
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        message: result.message || 'Email sent successfully',
      };
    } else {
      return {
        success: false,
        message: result.error || 'Failed to send email',
        error: result.error,
      };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: 'Network error: Unable to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
