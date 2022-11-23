from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField
from wtforms.validators import DataRequired

class SpotForm(FlaskForm):
  user_id = IntegerField("UserId")
  name = StringField("name", validators=[DataRequired()])
  address = StringField("address", validators=[DataRequired()])
  state = StringField("state", validators=[DataRequired()])
  country = StringField("country", validators=[DataRequired()])
  price = IntegerField("price", validators=[DataRequired()])
  description = StringField("description", validators=[DataRequired()])
  city = StringField('city', validators=[DataRequired()])
