import { BACKEND_URL_WITH_WEBSITE_ID } from "@/lib/constants/base";
import { ApiClient } from "../useApi";
import {
  CreateTicketDto,
  ReplyTicketDto,
  Ticket,
  TicketCategory,
} from "@/lib/types/ticket";

export interface TicketResponse {
  success: boolean;
  message: string;
}

export class TicketService {
  private api: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.api = apiClient || new ApiClient(BACKEND_URL_WITH_WEBSITE_ID);
  }

  getTickets = async (): Promise<Ticket[]> => {
    const response = await this.api.get<Ticket[]>(`/tickets`, {}, true);
    return response.data;
  };

  getTicket = async (data: { ticketId: string }): Promise<Ticket> => {
    const response = await this.api.get<Ticket>(
      `/tickets/${data.ticketId}`,
      {},
      true
    );
    return response.data;
  };

  createTicket = async (data: { ticket: CreateTicketDto }): Promise<Ticket> => {
    const response = await this.api.post<Ticket>(
      `/tickets`,
      data.ticket,
      {},
      true
    );
    return response.data;
  };

  replyToTicket = async (data: {
    ticketId: string;
    reply: ReplyTicketDto;
  }): Promise<Ticket> => {
    const response = await this.api.post<Ticket>(
      `/tickets/${data.ticketId}/reply`,
      data.reply,
      {},
      true
    );
    return response.data;
  };

  getTicketCategories = async (): Promise<TicketCategory[]> => {
    const response = await this.api.get<TicketCategory[]>(
      `/tickets/categories`,
      {},
      true
    );
    return response.data;
  };

  getTicketCategory = async (data: {
    categoryId: string;
  }): Promise<TicketCategory> => {
    const response = await this.api.get<TicketCategory>(
      `/tickets/categories/${data.categoryId}`,
      {},
      true
    );
    return response.data;
  };
}

export const ticketService = new TicketService();

export const serverTicketService = () => {
  const service = new TicketService();

  return {
    getTickets: service.getTickets.bind(service),
    getTicket: service.getTicket.bind(service),
    createTicket: service.createTicket.bind(service),
    replyToTicket: service.replyToTicket.bind(service),
    getTicketCategories: service.getTicketCategories.bind(service),
    getTicketCategory: service.getTicketCategory.bind(service),
  };
};
