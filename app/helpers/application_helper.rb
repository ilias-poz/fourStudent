require 'httparty'

module ApplicationHelper

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
    domains = getUKUniversities()
    checkDomain = false
    for i in 0..domains.length-1 do
      if domains[i].include?(user_domain)
        return true
      end
    end
    return checkDomain
  end
end
