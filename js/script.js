$(document).ready(function () {
  let currentDate = moment().format('YYYY-MM-DD');

  $('#tabelaProdutos').DataTable({
    ajax: {
      url: 'arquivos/produtos.json',
      dataSrc: 'produtos'
    },
    columns: [
      { data: 'id' },
      { data: 'nome' },
      { data: 'valor' },
      { data: 'data_cadastro' },
      { data: 'data_validade' }
    ],
    drawCallback: function (settings) {
      let api = this.api();
      let rows = api.rows({ page: 'current' }).nodes();

      $('.verificaValidade').click(function () {
        rows.each(function (row) {
          let dataValidade = moment(api.cell(row, 4).data(), 'DD/MM/YYYY').format('YYYY-MM-DD');

          if (dataValidade < currentDate) {
            $(row).addClass('expired');
          }
        });
      });

    }
  });
});
