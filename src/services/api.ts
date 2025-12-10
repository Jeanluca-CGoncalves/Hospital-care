import { 
  LoginCredentials, 
  RegisterCredentials, 
  AuthResponse, 
  Patient, 
  Doctor, 
  Appointment, 
  Medication,
  CreatePatientData, 
  CreateDoctorData, 
  UpdateDoctorData,
  CreateAppointmentData,
  UpdateAppointmentData,
  CreateMedicationData
} from '../types';

import { API_BASE_URL } from '../config/env';

class ApiService {
  // Helper para montar o cabeçalho com o Token
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Helper para tratar a resposta da API
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Tenta ler o erro enviado pelo backend, se não conseguir, usa erro genérico
      const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      
      // Se der erro 401 (Não autorizado), pode ser útil deslogar o usuário
      if (response.status === 401) {
        console.warn('Sessão expirada ou inválida');
        // localStorage.removeItem('token'); // Opcional: forçar logout
      }
      
      throw { message: error.message || 'Falha na requisição', status: response.status };
    }
    
    // Status 204 (No Content) não tem JSON para ler
    if (response.status === 204) {
      return null as T;
    }
    
    return response.json();
  }

  // ==========================================================
  // AUTH SERVICE (Gateway rota: /auth/**)
  // ==========================================================
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  // ==========================================================
  // PATIENTS SERVICE (Gateway rota: /patients/**)
  // ==========================================================
  async getPatients(): Promise<Patient[]> {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Patient[]>(response);
  }

  async getPatient(id: string): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Patient>(response);
  }

  async createPatient(data: CreatePatientData): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Patient>(response);
  }

  async updatePatient(id: string, data: CreatePatientData): Promise<Patient> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Patient>(response);
  }

  async deletePatient(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<void>(response);
  }

  // ==========================================================
  // DOCTORS - SCHEDULING SERVICE (Gateway rota: /doctors/**)
  // ==========================================================
  async getDoctors(): Promise<Doctor[]> {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Doctor[]>(response);
  }

  async getDoctor(id: string): Promise<Doctor> {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Doctor>(response);
  }

  async createDoctor(data: CreateDoctorData): Promise<Doctor> {
    const response = await fetch(`${API_BASE_URL}/doctors`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Doctor>(response);
  }

  async updateDoctor(id: string, data: UpdateDoctorData): Promise<Doctor> {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Doctor>(response);
  }

  async deleteDoctor(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<void>(response);
  }

  // ==========================================================
  // APPOINTMENTS - SCHEDULING SERVICE (Gateway rota: /appointments/**)
  // ==========================================================
  async getAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Appointment[]>(response);
  }

  async getAppointment(id: string): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Appointment>(response);
  }

  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Appointment>(response);
  }

  async updateAppointment(id: string, data: UpdateAppointmentData): Promise<Appointment> {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Appointment>(response);
  }

  async deleteAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<void>(response);
  }

  // ==========================================================
  // INVENTORY SERVICE (Gateway rota: /inventory/**)
  // ==========================================================
  async getMedications(): Promise<Medication[]> {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Medication[]>(response);
  }

  async getMedication(id: string): Promise<Medication> {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<Medication>(response);
  }

  async createMedication(data: CreateMedicationData): Promise<Medication> {
    const response = await fetch(`${API_BASE_URL}/inventory`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<Medication>(response);
  }

  async updateMedicationStock(id: string, amount: number): Promise<Medication> {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}/stock`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ amount }),
    });
    return this.handleResponse<Medication>(response);
  }

  async deleteMedication(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<void>(response);
  }
}

export const apiService = new ApiService();