import type { Cliente } from "../classes/Cliente";

export interface CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void;
}
