import { HttpErrorResponse } from '@angular/common/http';

/**
 * Extrai a mensagem de erro do corpo da resposta da API.
 * Transforma HttpErrorResponse em um Error legível para o usuário.
 */
export function extractApiError(error: unknown): Error {
  if (error instanceof HttpErrorResponse) {
    let body = error.error;

    // Angular às vezes entrega o body como string (JSON não parseado)
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // body é texto puro — usa direto se não estiver vazio
        if (body?.trim()) return new Error(body.trim());
      }
    }

    if (body && typeof body === 'object') {
      // Padrão NestJS: { message: string | string[] }
      if ('message' in body) {
        const raw = body['message'];
        const msg = Array.isArray(raw)
          ? (raw as string[]).join(', ')
          : String(raw);
        return new Error(msg);
      }

      // Fallback: { error: string }
      if ('error' in body) {
        return new Error(String(body['error']));
      }
    }

    // Último recurso: status code
    return new Error(`Erro ${error.status}: tente novamente.`);
  }

  if (error instanceof Error) return error;

  return new Error('Ocorreu um erro inesperado. Tente novamente.');
}
