require 'httparty'

class UniValidator
  
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

    def self.Validate(user_domain)
      ukdomains = getUKUniversities()
      return ukdomains.include?(user_domain)

    end
end
