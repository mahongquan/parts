#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
import os
import pickle
from PyQt5 import QtCore, QtWidgets
class MyTreeView(QtWidgets.QTreeView):
    def mousePressEvent(self, event):
        #print(event,dir(event))
        i=self.indexAt(event.pos())
        print(self.indexAt(event.pos()))
        print(self.model().filePath(i))
        return QtWidgets.QTreeView.mousePressEvent(self,event)

