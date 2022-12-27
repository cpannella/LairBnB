from flask_wtf import FlaskForm
from wtforms.fields import StringField, IntegerField, BooleanField, SubmitField, DateField, SelectField, DateTimeField
from wtforms.validators import DataRequired
from datetime import date
from datetime import time
from datetime import datetime

class BookingForm(FlaskForm):
  start_date = DateTimeField("Start Date", validators=[DataRequired()],  format='%m-%d-%Y %H:%M:%S',default= datetime.utcnow)
  end_date = DateTimeField("End Date", validators=[DataRequired()],  format='%m-%d-%Y %H:%M:%S',default= datetime.utcnow)
  spot_id = IntegerField("Spot Id", validators=[DataRequired()])
