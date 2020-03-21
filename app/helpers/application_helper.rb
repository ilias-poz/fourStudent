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

  def Validate(user_email)
    puts "user_email: "+user_email
    user_domain = user_email[user_email.index('@')+1..user_email.length-1]

    puts "user_domain: "+user_domain
    domains = getUKUniversities()
    for i in 0..domains.length-1 do
      if domains[i].include?(user_domain)
        return true
      end
    end
    return false
  end
end
