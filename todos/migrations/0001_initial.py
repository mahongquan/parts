# Generated by Django 2.2.1 on 2019-07-15 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100, verbose_name='事件')),
                ('completed', models.BooleanField(default=False, verbose_name='完成')),
            ],
        ),
    ]
