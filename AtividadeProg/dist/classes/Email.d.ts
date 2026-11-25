import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Cliente } from "./Cliente";
export declare class Email implements CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void;
}
//# sourceMappingURL=Email.d.ts.map