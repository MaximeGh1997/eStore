import React from "react"
import ContentLoader from "react-content-loader"

const FormLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1100}
    height={450}
    viewBox="0 0 1100 450"
    backgroundColor="#c7c7c7"
    foregroundColor="#d6d6d6"
    {...props}
  >
    <rect x="0" y="20" rx="8" ry="8" width="1100" height="40" /> 
    <rect x="0" y="110" rx="8" ry="8" width="1100" height="40" /> 
    <rect x="0" y="200" rx="8" ry="8" width="1100" height="40" /> 
    <rect x="0" y="290" rx="8" ry="8" width="1100" height="100" />
  </ContentLoader>
)

export default FormLoader