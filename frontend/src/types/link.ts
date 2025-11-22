export interface Link {
  _id: string;
  code: string;
  targetUrl: string;
  totalClicks: number;
  lastClicked: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLinkInput {
  targetUrl: string;
  code?: string;
}

export interface CreateLinkResponse {
  message: string;
  data: Link;
}

export interface GetAllLinksResponse {
  data: Link[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetSingleLinkResponse {
  data: Link;
}

export interface DeleteLinkResponse {
  message: string;
  data: {
    message: string;
    code: string;
  };
}

export interface HealthCheckResponse {
  ok: boolean;
  version: string;
  uptime: number;
  timestamp: string;
  environment: string;
}
