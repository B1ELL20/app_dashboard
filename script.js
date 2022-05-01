$(document).ready(() => {
	$('#documentacao').on('click', () => {
        $.get('documentacao.html', data => {
            $('#pagina').html(data)
        })
    })

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

    let totais = []
    let datas = []  

    var ctx = document.getElementById('myChart').getContext('2d');

    var chartGraph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Numero de vendas',
                data: [],
                pointBackgroundColor: "blue",
                pointBorderColor: "#FFF",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                backgroundColor: "blue"
            }]
        }
    });

    $('#competencia').on('change', e => {
        
        let competencia = $(e.target).val()
        let lista1 = []
        let lista2 = []

        $.ajax({
            type: 'GET',
            url: 'app.php',
            data: `competencia=${competencia}`,
            dataType: 'json',
            success: dados => {
                console.log(dados.individual_vendas)
                dados.individual_vendas.forEach(element => {
                    lista2.push(element.total)
                    let separador = element.data_venda
                    let separado = separador.split('-')
                    lista1.push(separado[2])
                });
                totais = lista2
                datas = lista1
                chartGraph.data.datasets[0].data = totais
                chartGraph.data.labels = datas
                chartGraph.update()

                
                console.log(datas)
                console.log(totais)
                 $('#numeroVendas').html(dados.numero_vendas)
                 $('#totalVendas').html(dados.total_vendas)
                 $('#totalDespesas').html(dados.total_despesas)
                },
            error: erro => { console.log(erro)}
        })
    })

})




