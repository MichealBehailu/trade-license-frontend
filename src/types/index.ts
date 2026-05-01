export interface Application {
  applicationId: string;
  status: string;
  submittedAt?: string;
  applicantName?: string;
  commodityName?: string;
  attachmentUrls?: string[];
  paymentAmount?: number;
  reviewerComment?: string;
  reviewedBy?: string;
  // add more as needed
}

export interface SubmitRequest {
  specificLicense: string;
  attachmentUrls: string[];
  paymentAmount: number;
  paymentReference: string;
  applicantName: string;
  applicantEmail: string;
  commodityName: string;
  commodityDescription: string;
}

export interface ReviewRequest {
  applicationId: string;
  reviewerName: string;
  action: 'ACCEPT' | 'REJECT' | 'ADJUST';
  comment: string;
}

export interface ApproveRequest {
  applicationId: string;
  approverName: string;
  action: 'APPROVE' | 'REJECT' | 'REREVIEW';
  comment: string;
}