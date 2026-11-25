import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Cliente } from "./Cliente";
export declare class SMS implements CanalNotificacao {
    enviar(cliente: Cliente, mensagem: string): void;
}
//# sourceMappingURL=SMS.d.ts.map