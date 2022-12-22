from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
  start_date = DateField("Start Date", validators=[DataRequired()])
  end_date = DateField("End Date", validators=[DataRequired()])
  spot_id = IntegerField("Spot Id", validators=[DataRequired()])
