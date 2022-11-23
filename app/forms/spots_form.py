from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField
from wtforms.validators import DataRequired

class SpotForm(FlaskForm):
  name = StringField("Name", validators=[DataRequired()]),
  address = StringField("Address", validators=[DataRequired()])
  state = StringField("State", validators=[DataRequired()])
  country = StringField("Country", validators=[DataRequired()])
  price = IntegerField("Price", validators=[DataRequired()])
  description = StringField("Description", validators=[DataRequired()])
  city = StringField("City", validators=[DataRequired()])
