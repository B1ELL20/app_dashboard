$(document).ready(() => {
	$('#documentacao').on('click', () => {
        $('#pagina').load('documentacao.html')
    })

    $('#suporte').on('click', () => {
        $('#pagina').load('suporte.html')
    })

    $('#feedback').on('click', () => {
        $('#pagina').load('feedback.html')
        $.ajax( {
            type:'GET',
            url: 'app.php',
            data: 'competencia=2018-10',
            dataType: 'json',
            success: dados => {
                $('#totalElogios').html(dados.total_elogios)
                $('#totalSugestoes').html(dados.total_sugestoes)
                $('#totalReclamacoes').html(dados.total_reclamacoes)
                console.log(dados.dados_reclamacoes)
               },
           error: erro => { console.log(erro)}
        })
    })
    $('#clientes').on('click', () => {
        $('#pagina').load('clientes.html')
        $.ajax( {
            type:'GET',
            url: 'app.php',
            data: 'competencia=2018-10',
            dataType: 'json',
            success: dados => {
                $('#clientesAtivos').append(dados.clientes_ativos)
                $('#clientesInativos').append(dados.clientes_inativos)
                dados.nome_clientes_ativos.forEach(element => {
                    $('#ativos ul').append(`<li class="list-group-item">${element.cliente}</li>`)
                });
                dados.nome_clientes_inativos.forEach(element => {
                    $('#inativos ul').append(`<li class="list-group-item">${element.cliente}</li>`)
                });
               },
           error: erro => { console.log(erro)}
        })
    })

    $('#competencia').on('change', e => {
        
        let competencia = $(e.target).val()

        $.ajax({
            type: 'GET',
            url: 'app.php',
            data: `competencia=${competencia}`,
            dataType: 'json',
            success: dados => {
                 $('#numeroVendas').html(dados.numero_vendas)
                 $('#totalVendas').html(dados.total_vendas)
                 $('#totalDespesas').html(dados.total_despesas)
                },
            error: erro => { console.log(erro)}
        })
    })
})
