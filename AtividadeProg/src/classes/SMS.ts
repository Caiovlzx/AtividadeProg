import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Cliente } from "./Cliente";

export class SMS implements CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void {
        console.log(`SMS para ${cliente.nome}: ${mensagem}`);
    }
}
