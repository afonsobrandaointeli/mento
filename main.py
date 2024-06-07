import streamlit as st
import streamlit_authenticator as stauth
import yaml
from yaml.loader import SafeLoader

with open('config.yml') as file:
  config = yaml.load(file, Loader=SafeLoader)


authenticator = stauth.Authenticate(
  config['credentials'],
  config['cookie']['name'],
  config['cookie']['key'],
  config['cookie']['expiry_days']
)

authenticator.login()

if st.session_state["authentication_status"]:
  authenticator.logout()
  st.write(f"Welcome *{st.session_state['name']}*")
  st.title("Mento Page")
elif st.session_state["authentication_status"] == False:
  st.error("Username/password is incorrect")
elif st.session_state["authentication_status"] == None:
  st.warning("Please enter your username and password")
