"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    nome;
    cpf;
    endereco;
    renda;
    canal;
    contas = [];
    constructor(nome, cpf, endereco, renda, canal) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.renda = renda;
        this.canal = canal;
    }
    adicionarConta(conta) {
        this.contas.push(conta);
    }
}
exports.Cliente = Cliente;
//# sourceMappingURL=Cliente.js.map