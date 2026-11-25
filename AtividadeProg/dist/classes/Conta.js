"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conta = void 0;
const Saque_1 = require("./Saque");
const ErroSaque_1 = require("../excecoes/ErroSaque");
const ValorInvalido_1 = require("../excecoes/ValorInvalido");
const ContaBloqueada_1 = require("../excecoes/ContaBloqueada");
const SaldoInsuficiente_1 = require("../excecoes/SaldoInsuficiente");
const LimiteDiarioExcedido_1 = require("../excecoes/LimiteDiarioExcedido");
class Conta {
    numero;
    agencia;
    dataAbertura;
    limiteDiario;
    cliente;
    saldo;
    bloqueada = false;
    totalSacadoHoje = 0;
    historico = [];
    constructor(numero, agencia, dataAbertura, saldoInicial, limiteDiario, cliente) {
        this.numero = numero;
        this.agencia = agencia;
        this.dataAbertura = dataAbertura;
        this.limiteDiario = limiteDiario;
        this.cliente = cliente;
        if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
            throw new Error("Saldo inicial inválido.");
        }
        if (!Number.isFinite(limiteDiario) || limiteDiario < 0) {
            throw new Error("Limite diário inválido.");
        }
        this.saldo = saldoInicial;
        cliente.adicionarConta(this);
    }
    consultarSaldo() {
        return this.saldo;
    }
    bloquear() {
        this.bloqueada = true;
    }
    desbloquear() {
        this.bloqueada = false;
    }
    depositar(valor) {
        if (!Number.isFinite(valor) || valor <= 0) {
            throw new Error("Valor de depósito inválido.");
        }
        this.saldo += valor;
    }
    sacar(valor) {
        try {
            if (!Number.isFinite(valor) || valor <= 0) {
                throw new ValorInvalido_1.ValorInvalidoException();
            }
            if (this.bloqueada) {
                throw new ContaBloqueada_1.ContaBloqueadaException();
            }
            if (valor > this.saldo) {
                throw new SaldoInsuficiente_1.SaldoInsuficienteException(valor - this.saldo);
            }
            if (this.totalSacadoHoje + valor > this.limiteDiario) {
                throw new LimiteDiarioExcedido_1.LimiteDiarioExcedidoException();
            }
            this.saldo -= valor;
            this.totalSacadoHoje += valor;
            const saque = new Saque_1.Saque(valor);
            this.historico.push(saque);
            return saque;
        }
        catch (erro) {
            if (erro instanceof ErroSaque_1.ErroSaque) {
                this.cliente.canal.enviar(this.cliente, erro.message);
            }
            throw erro;
        }
    }
}
exports.Conta = Conta;
//# sourceMappingURL=Conta.js.map