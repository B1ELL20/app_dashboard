<?php

// Classe Dashboard

class Dashboard {

    public $data_inicio;
    public $data_fim;
    public $numero_vendas;
    public $total_vendas; 
    public $clientes_ativos;
    public $clientes_inativos;
    public $total_reclamacoes;
    public $total_elogios;
    public $total_sugestoes;
    public $total_despesas;
    public $nome_clientes_ativos;
    public $nome_clientes_inativos;
    public $dados_reclamacoes;

    public function __get($name) {
        return $this->$name;
    }

    public function __set($name, $value) {
        $this->$name = $value;
    }
}

class Conexao {

    private $host = 'localhost';
    private $dbname = 'dashboard';
    private $user = 'root';
    private $pass = '';

    public function conectar() {
        try {
            $conexao = new PDO(
                "mysql:host=$this->host;dbname=$this->dbname","$this->user","$this->pass"
            );
            return $conexao;

        } catch(PDOException $e) {
            echo '<p>'. $e->getMessage() . '</p>';
        }
    }
}

class Bd {

    private $conexao;
    private $dashboard;

    public function __construct($conexao, $dashboard) {
        $this->conexao = $conexao->conectar();
        $this->dashboard = $dashboard;
    }
    public function getNumeroVendas() {
        $query = '
            select
                count(*) as numero_vendas
            from
                tb_vendas
            where
                data_venda between :data_inicio and :data_fim';

        $stmt = $this->conexao->prepare($query);
        $stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
        $stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->numero_vendas;
    }

    public function getTotalVendas() {
        $query = '
            select
                SUM(total) as total_vendas
            from
                tb_vendas
            where
                data_venda between :data_inicio and :data_fim';

        $stmt = $this->conexao->prepare($query);
        $stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
        $stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->total_vendas;
    }

    public function getClienteAtivo() {
        $query = '
            select
                count(*) as qtd_ativos
            from
                tb_clientes
            where
                cliente_ativo = 1';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->qtd_ativos;
    }

    public function getNomeClienteAtivo() {
        $query = '
            select
                cliente
            from
                tb_clientes
            where
                cliente_ativo = 1';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function getNomeClienteInativo() {
        $query = '
            select
                cliente
            from
                tb_clientes
            where
                cliente_ativo = 0';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function getClienteInativo() {
        $query = '
            select
                count(*) as qtd_inativos
            from
                tb_clientes
            where
                cliente_ativo = 0';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->qtd_inativos;
    }

    public function getReclamacoes() {
        $query = '
            select
                count(*) as qtd_reclamacoes
            from
                tb_contatos
            where
                tipo_contato = 1';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->qtd_reclamacoes;
    }

    public function getUserReclamacoes() {
        $query = '
            select
                contato, email
            from
                tb_contatos
            where
                tipo_contato = 1';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    public function getElogios() {
        $query = '
            select
                count(*) as qtd_elogios
            from
                tb_contatos
            where
                tipo_contato = 2';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->qtd_elogios;
    }

    public function getSugestao() {
        $query = '
            select
                count(*) as qtd_sugestao
            from
                tb_contatos
            where
                tipo_contato = 3';

        $stmt = $this->conexao->prepare($query);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->qtd_sugestao;
    }

    public function getDespesas() {
        $query = '
            select
                SUM(total) as total_despesas
            from
                tb_despesas
            where
                data_despesa between :data_inicio and :data_fim';

        $stmt = $this->conexao->prepare($query);
        $stmt->bindValue(':data_inicio', $this->dashboard->__get('data_inicio'));
        $stmt->bindValue(':data_fim', $this->dashboard->__get('data_fim'));
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_OBJ)->total_despesas;
    }
}


$dashboard = new Dashboard();

$conexao = new Conexao();

$competencia = explode('-', $_GET['competencia']);

if($_GET['competencia'] == '2018-08') {
    $data_inicio = '2018-08-01';
    $data_fim = '2018-08-31';
} else if ($_GET['competencia'] == '2018-09') {
    $data_inicio = '2018-09-01';
    $data_fim = '2018-09-31';
} else if ($_GET['competencia'] == '2018-10') {
    $data_inicio = '2018-10-01';
    $data_fim = '2018-10-31';
}

$dashboard->__set('data_inicio', $data_inicio );
$dashboard->__set('data_fim', $data_fim);

$bd = new Bd($conexao, $dashboard);

$dashboard->__set('numero_vendas', $bd->getNumeroVendas());
$dashboard->__set('total_vendas', $bd->getTotalVendas());
$dashboard->__set('clientes_ativos', $bd->getClienteAtivo());
$dashboard->__set('clientes_inativos', $bd->getClienteInativo());
$dashboard->__set('total_reclamacoes', $bd->getReclamacoes());
$dashboard->__set('total_elogios', $bd->getElogios());
$dashboard->__set('total_sugestoes', $bd->getSugestao());
$dashboard->__set('total_despesas', $bd->getDespesas());
$dashboard->__set('nome_clientes_ativos', $bd->getNomeClienteAtivo());
$dashboard->__set('nome_clientes_inativos', $bd->getNomeClienteInativo());
$dashboard->__set('dados_reclamacoes', $bd->getUserReclamacoes());

echo json_encode($dashboard);

?>
