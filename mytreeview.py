#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtWidgets import QMenu
class MyTreeView(QtWidgets.QTreeView):
    # def mousePressEvent(self, event):
    #     #print(event,dir(event))
    #     i=self.indexAt(event.pos())
    #     print(self.indexAt(event.pos()))
    #     print(self.model().filePath(i))
    #     return QtWidgets.QTreeView.mousePressEvent(self,event)
    def contextMenuEvent(self, event):
        i=self.indexAt(event.pos())
        #print(self.indexAt(event.pos()))
        menu = QMenu(self)
        deleteAction = menu.addAction("删除")
        pasteAction = menu.addAction("粘贴")
        action = menu.exec_(self.mapToGlobal(event.pos()))
        if action == deleteAction:
            p=self.parent()
            while p!=None:
            	oldp=p
            	p=p.parent()
            oldp.treat_delete(self.model().filePath(i))
        elif action == pasteAction:
            p=self.parent()
            while p!=None:
            	oldp=p
            	p=p.parent()
            oldp.treat_paste(self.model().filePath(i))

