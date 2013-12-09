class User < Sequel::Model

  private

  def validate
    super
    validates_unique :email
  end

end