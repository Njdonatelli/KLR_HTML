export interface LeadPayload {
  projectType?: string;
  budgetRange?: string;
  company?: string;
  firstName: string;
  lastName: string;
  phone: string;
  phoneExt?: string;
  phone2?: string;
  phone2Ext?: string;
  cell?: string;
  email: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
}

export const submitLeadToCRM = async (payload: LeadPayload) => {
  console.warn("CRM submission is disabled. Endpoint not configured. Payload was:", payload);
  // Disabled until real Contractor Foreman / ClickUp endpoints are provided
  return { 
    success: false, 
    error: new Error("Lead submission is currently disabled for maintenance. Please call us directly.") 
  };
};
