import { Saque } from "./Saque";
import type { Cliente } from "./Cliente";
export declare class Conta {
    numero: string;
    agencia: string;
    dataAbertura: Date;
    limiteDiario: number;
    cliente: Cliente;
    private saldo;
    private bloqueada;
    private totalSacadoHoje;
    historico: Saque[];
    constructor(numero: string, agencia: string, dataAbertura: Date, saldoInicial: number, limiteDiario: number, cliente: Cliente);
    consultarSaldo(): number;
    bloquear(): void;
    desbloquear(): void;
    depositar(valor: number): void;
    sacar(valor: number): Saque;
}
//# sourceMappingURL=Conta.d.ts.map