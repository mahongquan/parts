
from django.db.models import Q
from django.utils.html import escape
from mysite.parts.models import Item,Contact,Pack
from ajax_select import LookupChannel
from ajax_select import register

@register('item')
class ItemLookup(LookupChannel):

    model = Item

    def get_query(self, q, request):
        return Item.objects.filter(Q(name__icontains=q)).order_by('name')

    def get_result(self, obj):
        u""" result is the simple text that is the completion of what the person typed """
        return obj.name

    def format_match(self, obj):
        """ (HTML) formatted item for display in the dropdown """
        return u"%s" % (escape(obj.bh+"_"+obj.name+"_"+obj.guige))
        # return self.format_item_display(obj)

    def format_item_display(self, obj):
        """ (HTML) formatted item for displaying item in the selected deck area """
        return u"%s" % (escape(obj.guige))

@register('contact')
class ContactLookup(LookupChannel):

    model = Contact

    def get_query(self, q, request):
        return Contact.objects.filter(Q(hetongbh__icontains=q)).order_by('hetongbh')

    def get_result(self, obj):
        u""" result is the simple text that is the completion of what the person typed """
        return obj.hetongbh

    def format_match(self, obj):
        """ (HTML) formatted item for display in the dropdown """
        return u"%s" % (str(obj.id)+":"+escape(obj.hetongbh))
        # return self.format_item_display(obj)

    def format_item_display(self, obj):
        """ (HTML) formatted item for displaying item in the selected deck area """
        return u"%s" % (str(obj.id)+":"+escape(obj.hetongbh))

@register('pack')
class PackLookup(LookupChannel):

    model = Pack

    def get_query(self, q, request):
        return Pack.objects.filter(Q(name__icontains=q)).order_by('name')

    def get_result(self, obj):
        u""" result is the simple text that is the completion of what the person typed """
        return obj.name

    def format_match(self, obj):
        """ (HTML) formatted item for display in the dropdown """
        return u"%s" % (str(obj.id)+":"+escape(obj.name))
        # return self.format_item_display(obj)

    def format_item_display(self, obj):
        """ (HTML) formatted item for displaying item in the selected deck area """
        return u"%s" % (str(obj.id)+":"+escape(obj.name))