$(document).ready(() => {
	$('#documentacao').on('click', () => {
        $.get('documentacao.html', data => {
            $('#pagina').html(data)
        })
    })
/*
    $('#suporte').on('click', () => {
        $('#pagina').load('suporte.html')
    })

    $('#feedback').on('click', ()=> {
        $('#pagina').load('feedback.html')
        $.ajax( {
            type:'GET',
            url: 'app.php',
            data: 'competencia=2018-10',
            dataType: 'json',
            success: dados => {
                $('#totalElogios').append(dados.total_elogios)
                $('#totalSugestoes').append(dados.total_sugestoes)
                $('#totalReclamacoes').append(dados.total_reclamacoes)
                dados.dados_reclamacoes.forEach(element => {
                    $('#detalhesR ul').append(`<li class="list-group-item">
                        <h5>${element.email}</h5>
                        <p>${element.contato}</p>
                    </li>`)
                });
                dados.dados_elogios.forEach(element => {
                    $('#detalhesE ul').append(`<li class="list-group-item">
                        <h5>${element.email}</h5>
                        <p>${element.contato}</p>
                    </li>`)
                });
                dados.dados_sugestoes.forEach(element => {
                    $('#detalhesS ul').append(`<li class="list-group-item">
                        <h5>${element.email}</h5>
                        <p>${element.contato}</p>
                    </li>`)
                });
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

    $('#conta').on('click', () => {
        $('#pagina').load('conta.html')
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
    })*/
})
