require 'httparty'
def getUKUniversities
  url = 'http://universities.hipolabs.com/search?country=united kingdom'
  response = HTTParty.get(url)
  json = response.parsed_response
  ukdomains = []
  for i in 0..json.length-1 do
    ukdomains << json[i]["domains"]
  end
  return ukdomains
end

def Validate(user_domain)
  ukdomains = getUKUniversities()
  return domains.include?(user_domain)

end

getUKUniversities()
