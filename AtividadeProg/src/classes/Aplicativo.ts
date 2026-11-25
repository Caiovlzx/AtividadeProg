import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Cliente } from "./Cliente";

export class Aplicativo implements CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void {
        console.log(`Notificação no aplicativo para ${cliente.nome}: ${mensagem}`);
    }
}
