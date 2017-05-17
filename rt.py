#!/usr/bin/env python
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QApplication, QTableView
from PyQt5.QtSql import (QSqlQuery, QSqlRelation, QSqlRelationalDelegate,
        QSqlRelationalTableModel, QSqlTableModel)

from PyQt5.QtWidgets import QMessageBox
from PyQt5.QtSql import QSqlDatabase, QSqlQuery
def createConnection():
    db = QSqlDatabase.addDatabase('QSQLITE')
    db.setDatabaseName('data.sqlite')
    if not db.open():
        QMessageBox.critical(None, "Cannot open database",
                "Unable to establish a database connection.\n"
                "This example needs SQLite support. Please read the Qt SQL "
                "driver documentation for information how to build it.\n\n"
                "Click Cancel to exit.",
                QMessageBox.Cancel)
        return False
    return True


def initializeModel(model):
    model.setTable('parts_packitem')

    model.setEditStrategy(QSqlTableModel.OnManualSubmit)
    model.setRelation(1, QSqlRelation('parts_pack', 'id', 'name'))
    model.setRelation(2, QSqlRelation('parts_item', 'id', 'name'))

    model.setHeaderData(0, Qt.Horizontal, "ID")
    model.setHeaderData(1, Qt.Horizontal, "包")
    model.setHeaderData(2, Qt.Horizontal, "备件")
    model.setHeaderData(3, Qt.Horizontal, "数量")
    model.setHeaderData(4, Qt.Horizontal, "缺货")

    model.select()


def createView(title, model):
    view = QTableView()
    view.setModel(model)
    view.setItemDelegate(QSqlRelationalDelegate(view))
    view.setWindowTitle(title)

    return view


def createRelationalTables():
    pass

if __name__ == '__main__':

    import sys

    app = QApplication(sys.argv)
    if not createConnection():
        sys.exit(1)

    createRelationalTables()

    model = QSqlRelationalTableModel()

    initializeModel(model)

    view = createView("包装件", model)

    view.show()

    sys.exit(app.exec_())
