from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField, DateTimeField
from wtforms.validators import DataRequired

class BookingForm(FlaskForm):
  start_date = DateTimeField("Start Date", format='%Y-%m-%d %H:%M:%S', validators=[DataRequired()])
  end_date = DateTimeField("End Date", format='%Y-%m-%d %H:%M:%S',validators=[DataRequired()])
  spot_id = IntegerField("Spot Id", validators=[DataRequired()])
