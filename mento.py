import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

st.set_page_config(page_title='Mento', page_icon=':rocket:', layout='wide')

st.title('Mento')


with st.expander('What is Mento?'):
  st.markdown('''
  Mento is a chatbot that can help you to answer questions about your course.
''')

  st.subheader('Features')

  data = pd.DataFrame({
    'Cidades': ['Belém', 'São Paulo'],
    'Precos': [np.random.randint(100, 1000), np.random.randint(100, 1000)]
  })

  st.bar_chart(data, x='Cidades', y='Precos')


st.subheader('About')
st.info('This is a Thor')


