import type { CanalNotificacao } from "../interfaces/CanalNotificacao";
import type { Conta } from "./Conta";

export class Cliente {
    public contas: Conta[] = [];

    constructor(
        public nome: string,
        public cpf: string,
        public endereco: string,
        public renda: number,
        public canal: CanalNotificacao
    ) {}

    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }
}
