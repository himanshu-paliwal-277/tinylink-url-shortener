import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';
import type {
  CreateLinkInput,
  CreateLinkResponse,
  DeleteLinkResponse,
  GetAllLinksResponse,
  GetSingleLinkResponse,
  HealthCheckResponse,
} from '@/types/link';

// CREATE LINK
export const createLinkRequest = async (data: CreateLinkInput): Promise<CreateLinkResponse> => {
  try {
    const response = await AxiosInstance.post<CreateLinkResponse>('/links', data);
    console.log('Response in create link request', response);
    return response.data;
  } catch (error) {
    console.error('Error in create link request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// GET ALL LINKS
export const fetchAllLinksRequest = async (
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<GetAllLinksResponse> => {
  try {
    const response = await AxiosInstance.get<GetAllLinksResponse>('/links', {
      params: { page, limit, search },
    });
    console.log('Response in fetch all links request', response);
    return response.data;
  } catch (error) {
    console.error('Error in fetch all links request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// GET SINGLE LINK
export const fetchSingleLinkRequest = async (code: string): Promise<GetSingleLinkResponse> => {
  try {
    const response = await AxiosInstance.get<GetSingleLinkResponse>(`/links/${code}`);
    console.log('Response in fetch single link request', response);
    return response.data;
  } catch (error) {
    console.error('Error in fetch single link request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// DELETE LINK
export const deleteLinkRequest = async (code: string): Promise<DeleteLinkResponse> => {
  try {
    const response = await AxiosInstance.delete<DeleteLinkResponse>(`/links/${code}`);
    console.log('Response in delete link request', response);
    return response.data;
  } catch (error) {
    console.error('Error in delete link request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// HEALTH CHECK
export const healthCheckRequest = async (): Promise<HealthCheckResponse> => {
  try {
    // Health check is on the base URL, not /api/v1
    const response = await axios.get<HealthCheckResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/healthz`
    );
    console.log('Response in health check request', response);
    return response.data;
  } catch (error) {
    console.error('Error in health check request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
