import { Saque } from "./Saque";
import { ErroSaque } from "../excecoes/ErroSaque";
import { ValorInvalidoException } from "../excecoes/ValorInvalido";
import { ContaBloqueadaException } from "../excecoes/ContaBloqueada";
import { SaldoInsuficienteException } from "../excecoes/SaldoInsuficiente";
import { LimiteDiarioExcedidoException } from "../excecoes/LimiteDiarioExcedido";
import type { Cliente } from "./Cliente";

export class Conta {
    private saldo: number;
    private bloqueada = false;
    private totalSacadoHoje = 0;
    public historico: Saque[] = [];

    constructor(
        public numero: string,
        public agencia: string,
        public dataAbertura: Date,
        saldoInicial: number,
        public limiteDiario: number,
        public cliente: Cliente
    ) {
        if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
            throw new Error("Saldo inicial inválido.");
        }
        if (!Number.isFinite(limiteDiario) || limiteDiario < 0) {
            throw new Error("Limite diário inválido.");
        }

        this.saldo = saldoInicial;
        cliente.adicionarConta(this);
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    bloquear(): void {
        this.bloqueada = true;
    }

    desbloquear(): void {
        this.bloqueada = false;
    }

    depositar(valor: number): void {
        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error("Valor de depósito inválido.");
        }
        this.saldo += valor;
    }

    sacar(valor: number): Saque {
        try {
            if (!Number.isFinite(valor) || valor <= 0) {
                throw new ValorInvalidoException();
            }
            if (this.bloqueada) {
                throw new ContaBloqueadaException();
            }
            if (valor > this.saldo) {
                throw new SaldoInsuficienteException(valor - this.saldo);
            }
            if (this.totalSacadoHoje + valor > this.limiteDiario) {
                throw new LimiteDiarioExcedidoException();
            }

            this.saldo -= valor;
            this.totalSacadoHoje += valor;

            const saque = new Saque(valor);
            this.historico.push(saque);
            return saque;
        } catch (erro) {
            if (erro instanceof ErroSaque) {
                this.cliente.canal.enviar(this.cliente, erro.message);
            }
            throw erro;
        }
    }
}
