import { Cliente } from "./classes/Cliente";
import { Conta } from "./classes/Conta";
import { SMS } from "./classes/SMS";
import { Email } from "./classes/Email";
import { Aplicativo } from "./classes/Aplicativo";

function testarSaque(descricao: string, conta: Conta, valor: number): void {
    console.log(` ${descricao}`);
    try {
        conta.sacar(valor);
        console.log("Saque realizado com sucesso.");
    } catch (erro) {
        if (erro instanceof Error) console.log(`Erro: ${erro.message}`);
    }
    console.log(`Saldo atual: R$ ${conta.consultarSaldo().toFixed(2)}`);
}

const sms = new SMS();
const email = new Email();
const app = new Aplicativo();

const cliente1 = new Cliente("Ana", "111.111.111-11", "Rua A", 2500, sms);
const cliente2 = new Cliente("Pedro", "222.222.222-22", "Rua B", 3000, email);
const cliente3 = new Cliente("Maria", "333.333.333-33", "Rua C", 4000, app);

const contaValida1 = new Conta("1001", "001", new Date("2026-01-10"), 1000, 500, cliente1);
const contaValida2 = new Conta("1002", "001", new Date("2026-02-10"), 800, 400, cliente2);
testarSaque("Saque válido 1", contaValida1, 100);
testarSaque("Saque válido 2", contaValida2, 200);

const contaInvalida1 = new Conta("2001", "001", new Date(), 500, 500, cliente1);
const contaInvalida2 = new Conta("2002", "001", new Date(), 500, 500, cliente2);
testarSaque("Valor inválido: zero", contaInvalida1, 0);
testarSaque("Valor inválido: negativo", contaInvalida2, -50);

const contaBloqueada1 = new Conta("3001", "001", new Date(), 1000, 500, cliente1);
const contaBloqueada2 = new Conta("3002", "001", new Date(), 2000, 1000, cliente2);
contaBloqueada1.bloquear();
contaBloqueada2.bloquear();
testarSaque("Conta bloqueada 1", contaBloqueada1, 100);
testarSaque("Conta bloqueada 2", contaBloqueada2, 200);

const contaSaldo1 = new Conta("4001", "001", new Date(), 100, 500, cliente1);
const contaSaldo2 = new Conta("4002", "001", new Date(), 50, 500, cliente2);
testarSaque("Saldo insuficiente 1", contaSaldo1, 150);
testarSaque("Saldo insuficiente 2", contaSaldo2, 200);

const contaLimite1 = new Conta("5001", "001", new Date(), 1000, 200, cliente1);
const contaLimite2 = new Conta("5002", "001", new Date(), 1000, 100, cliente2);
testarSaque("Saque inicial conta 1", contaLimite1, 150);
testarSaque("Saque inicial conta 2", contaLimite2, 80);
testarSaque("Limite diário excedido 1", contaLimite1, 100);
testarSaque("Limite diário excedido 2", contaLimite2, 30);

console.log("Contas de Ana");
for (const conta of cliente1.contas) {
    console.log(`Conta ${conta.numero} - Agência ${conta.agencia}`);
}
