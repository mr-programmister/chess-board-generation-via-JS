"use strict";

var app = {
  config: {
    rows: [8, 7, 6, 5, 4, 3, 2, 1],
    cols: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  },
  run: function run() {
    var board = this.generateBoard();
    document.body.innerHTML = board;
    this.insertFiguresOnDesk();
    this.insertPawns();
    this.insertRowsNumbers();
    this.insertColsChars();
  },

  /**
   * Метод вставляет пешки на доску.
   */
  insertPawns: function insertPawns() {
    var whitePawnsRow = document.querySelectorAll('td[data-rownum="2"]');

    for (var i = 0; i < whitePawnsRow.length; i++) {
      whitePawnsRow[i].innerHTML = this.getFigure('pawn', 'whiteFigure');
    }

    var blackPawnsRow = document.querySelectorAll('td[data-rownum="7"]');

    for (var _i = 0; _i < blackPawnsRow.length; _i++) {
      blackPawnsRow[_i].innerHTML = this.getFigure('pawn', 'blackFigure');
    }
  },

  /**
   * Метод вставляет на доску все фигуры, кроме пешек.
   */
  insertFiguresOnDesk: function insertFiguresOnDesk() {
    for (var i = 0; i < positions.length; i++) {
      var cell = document.querySelector("[data-rownum=\"".concat(positions[i].coordRow, "\"][data-colchar=\"").concat(positions[i].coordCol, "\"]"));
      var figure = this.getFigure(positions[i].figure, positions[i].color + "Figure");
      cell.innerHTML = "".concat(figure);
    }
  },

  /**
   * Метод возвращает тег i в виде строки, с подставленным именем
   * фигуры и классом, управляющим цветом фигуры.
   * @param {string} name название фигуры, возможные значения rook, knight, bishop, queen, king, pawn.
   * @param {string} colorClass цвет фигуры, м.б. "whiteFigure", "blackFigure".
   * @returns {string} 
   */
  getFigure: function getFigure(name, colorClass) {
    return "<i class=\"fas fa-chess-".concat(name, " ").concat(colorClass, "\"></i>");
  },

  /**
   * Метод генерирует игровое поле 8 на 8.
   * @returns {string} html разметка в виде строки.
   */
  generateBoard: function generateBoard() {
    var board = '';
    var rowStartWithColor = 'white';

    for (var i = 0; i < this.config.rows.length; i++) {
      var row = "";

      if (rowStartWithColor == 'white') {
        row = this.generateRow('white', this.config.rows[i]);
        rowStartWithColor = 'black';
      } else {
        row = this.generateRow('black', this.config.rows[i]);
        rowStartWithColor = 'white';
      }

      board += row;
    }

    return "<table>".concat(board, "</table>");
  },

  /**
   * Метод генерирует тег tr (строку игровой доски) с закрашенными тегами
   * td (ячейкам).
   * @param {string} startWithColor с какого цвета строка начинается от левого края,
   * м.б. "white", "black".
   * @param {number} rowNum номер строки от 8 до 1, т.к. шахматная доска формируется
   * сверху вниз, поэтому номер начинается с 8.
   * @returns {string} html-разметка, тег tr с оформленными внутри тегами td.
   */
  generateRow: function generateRow(startWithColor, rowNum) {
    var currentColorClass = startWithColor;
    var row = '';

    for (var i = 0; i < this.config.cols.length; i++) {
      var field = '';

      if (currentColorClass === 'white') {
        field = this.generateField('white', rowNum, this.config.cols[i]);
        currentColorClass = 'black';
      } else {
        field = this.generateField('black', rowNum, this.config.cols[i]);
        currentColorClass = 'white';
      }

      row += field;
    }

    return "<tr>".concat(row, "</tr>");
  },

  /**
   * Метод генерирует ячейку (тег td) с нужным классом цвета
   * и координатами на поле.
   * @param {string} color класс цвета ячейки, м.б. "white", "black".
   * @param {number} rowNum номер строки игровой доски.
   * @param {string} colChar буква колонки игровой доски.
   * @returns {string} html-разметка с заполненными атрибутами координат и классом цвета.
   */
  generateField: function generateField(color, rowNum, colChar) {
    return "<td data-rownum=\"".concat(rowNum, "\" data-colchar=\"").concat(colChar, "\" class=\"").concat(color, "\"></td>");
  },

  /**
   * Метод вставляет на существующую доску колонку 
   * слева, с указанием номера строки.
   */
  insertRowsNumbers: function insertRowsNumbers() {
    var trs = document.querySelectorAll('tr');

    for (var i = 0; i < trs.length; i++) {
      var td = document.createElement('td');
      td.innerText = this.config.rows[i];
      trs[i].insertAdjacentElement("afterbegin", td);
    }
  },

  /**
   * Метод создает строку (tr) с названиями колонок в виде букв,
   * а также в начале вставляет пустую ячейку, которая идет под
   * цифрами.
   */
  insertColsChars: function insertColsChars() {
    var tr = document.createElement('tr');
    tr.innerHTML += '<td></td>';

    for (var i = 0; i < this.config.cols.length; i++) {
      tr.innerHTML += "<td>".concat(this.config.cols[i], "</td>");
    }

    var tbody = document.querySelector('tbody');
    tbody.insertAdjacentElement('beforeend', tr);
  }
};
app.run();