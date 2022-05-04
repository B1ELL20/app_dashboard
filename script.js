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

    let totais1 = []
    let datas1 = []
    let totais2 = []
    let datas2 = []   

    var ctx1 = document.getElementById('ChartTotal').getContext('2d');

    var chartGraph1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Numero de vendas',
                data: [],
                pointBackgroundColor: "green",
                pointBorderColor: "#FFF",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                backgroundColor: "green",
                borderColor: "green",
                fill : false,
            }]
        }
    });

    var ctx2 = document.getElementById('ChartDespesas').getContext('2d');

    var chartGraph2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5'],
            datasets: [{
                label: 'Numero de vendas',
                data: [],
                pointBackgroundColor: "red",
                pointBorderColor: "#FFF",
                pointBorderWidth: 2,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 1,
                pointRadius: 4,
                backgroundColor: "red",
                borderColor: "red",
                fill : false,
            }]
        }
    });

    var ctx3 = document.getElementById('chartRelacao').getContext('2d');

    var chartGraph3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [],
                backgroundColor: ['green', 'red']
            }],
            labels: ['Lucros', 'Gastos']
        }
    });

    $('#competencia').on('change', e => {
        
        let competencia = $(e.target).val()
        let lista1 = []
        let lista2 = []
        let lista3 = []
        let lista4 = []
        let lista5 = []

        $.ajax({
            type: 'GET',
            url: 'app.php',
            data: `competencia=${competencia}`,
            dataType: 'json',
            success: dados => {
                dados.individual_vendas.forEach(element => {
                    lista2.push(element.total)
                    let separador1 = element.data_venda
                    let separado1 = separador1.split('-')
                    lista1.push(separado1[2])
                });

                totais1 = lista2
                datas1 = lista1
                chartGraph1.data.datasets[0].data = totais1
                chartGraph1.data.labels = datas1
                chartGraph1.update()

                dados.individual_despesas.forEach(element => {
                    lista4.push(element.total)
                    let separador2 = element.data_despesa
                    let separado2 = separador2.split('-')
                    lista3.push(separado2[2])
                });

                totais2 = lista4
                datas2 = lista3
                chartGraph2.data.datasets[0].data = totais2
                chartGraph2.data.labels = datas2
                chartGraph2.update()

                lista5 = [dados.total_vendas, dados.total_despesas]

                chartGraph3.data.datasets[0].data = lista5
                chartGraph3.update() 
                
                 $('#numeroVendas').html(dados.numero_vendas)
                 $('#totalVendas').html(dados.total_vendas)
                 $('#totalDespesas').html(dados.total_despesas)
                },
            error: erro => { console.log(erro)}
        })
    })

})




