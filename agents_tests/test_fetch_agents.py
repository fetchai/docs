from utils import iterate_over_mdx_files, agent_function

from protocols_agents import booking_demo, cleaning_demo


class TestFetchAgents:
    def test_create_a_uagent(self):
        iterate_over_mdx_files("create-a-uagent")

    def test_creating_interval_task(self):
        iterate_over_mdx_files("interval-task")

    def test_getting_uagent_address(self):
        iterate_over_mdx_files("getting-uagent-address")

    def test_message_verification(self):
        iterate_over_mdx_files("message-verification")

    # def test_send_tokens(self):
    #     iterate_over_mdx_files("send-tokens")

    def test_register_in_almanac(self):
        iterate_over_mdx_files("register-in-almanac")

    def test_storage_function(self):
        iterate_over_mdx_files("storage-function")

    def test_agents(self):
        agent_function("communicating-with-other-agents")

    def test_booking_demo(self):
        booking_demo("booking-demo")

    def test_cleaning_demo(self):
        cleaning_demo("cleaning-demo")
