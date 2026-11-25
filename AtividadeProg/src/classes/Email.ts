import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Cliente } from "./Cliente";

export class Email implements CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void {
        console.log(`E-mail para ${cliente.nome}: ${mensagem}`);
    }
}
