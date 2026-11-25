import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Conta } from "./Conta";
export declare class Cliente {
    nome: string;
    cpf: string;
    endereco: string;
    renda: number;
    canal: CanalNotificacao;
    contas: Conta[];
    constructor(nome: string, cpf: string, endereco: string, renda: number, canal: CanalNotificacao);
    adicionarConta(conta: Conta): void;
}
//# sourceMappingURL=Cliente.d.ts.map